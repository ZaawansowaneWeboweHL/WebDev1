import { lista_umiejetnosci, ADRES_API } from "./dane.js";
import { buduj_liste, przefiltruj, podsumowanie } from "./umiejetnosci.js";

const lista = document.querySelector("#lista-umiejetnosci");

lista.innerHTML = buduj_liste(lista_umiejetnosci);

const formularz = document.querySelector("#formularz-kontakt");
const komunikat = document.querySelector("#komunikat");

const pokaz_komunikat = (tresc, rodzaj) => {
    komunikat.textContent = tresc;
    komunikat.classList.remove("blad", "sukces");
    komunikat.classList.add(rodzaj);
};

formularz.addEventListener("submit", (event) => {
    event.preventDefault();

    
    let tresc = document.querySelector("#tresc").value;

    const dane = Object.fromEntries(new FormData(formularz));
    const {imie, email, temat} = dane;

    if (imie.trim() === ""){
        pokaz_komunikat("Podaj imię.", "blad");
        return ;
    }
    
    if (email.trim() === ""){
        pokaz_komunikat("Podaj email.", "blad");
        return ;
    }
    
    if (temat.trim() === ""){
        pokaz_komunikat("Wybierz temat.", "blad");
        return ;
    }

    pokaz_komunikat(`Imię: ${imie}\nTemat: ${temat}`, "sukces");

    formularz.reset()
});

let ilosc_klikniec = 0;
const ilosc_klikniec_blok = document.querySelector("#ilosc-klikniec");
const klikacz = document.querySelector("#klikacz");

klikacz.addEventListener("click", (event) => {
    if (ilosc_klikniec == 9999){
        ilosc_klikniec = 0;
    }
    ilosc_klikniec++;
    ilosc_klikniec_blok.textContent = String(ilosc_klikniec).padStart(4, "0");
});


// Obsługa kliknięć listy
const podsumowanieEl = document.querySelector("#podsumowanie");
const filtryEl = document.querySelector("#filtry");

const pokaz_umiejetnosci = (kategoria = "wszystkie") => {
    const wybrane = przefiltruj(lista_umiejetnosci, kategoria);

    lista.innerHTML = buduj_liste(wybrane);
    podsumowanieEl.textContent = podsumowanie(wybrane);
}

pokaz_umiejetnosci();

filtryEl.addEventListener("click", (event) => {
    const przycisk = event.target.closest("button");

    if (!przycisk) return;

    filtryEl.querySelectorAll("button").forEach(b => b.classList.remove("aktywny"));
    przycisk.classList.add("aktywny");

    pokaz_umiejetnosci(przycisk.dataset.kategoria);
});


const inspiracjeEl = document.querySelector("#inspiracje");

const pobierzUzytkownikow = async (adres) => {
    const odpowiedz = await fetch(adres);

    if (!odpowiedz.ok){
        throw new Error(`Serwer odpowiedział: ${odpowiedz.status}`);
    }

    return odpowiedz.json();
};

const pokazInspiracje = async () => {
    inspiracjeEl.innerHTML = `<p class="ladowanie">Ładowanie...</p>`;
    try {
        const uzytkownicy = await pobierzUzytkownikow(ADRES_API);
        inspiracjeEl.innerHTML = 
        `<ul class="osoby">
            ${uzytkownicy.map(({ name, address }) => 
                `<li>
                    <strong>${name}</strong>
                    <span>${address.city}</span>
                </li>`).join("")
            }
        </ul>`;
    } 
    catch (blad) {
        console.error("Nie udało się pobrać danych:", blad.message);
        inspiracjeEl.innerHTML = 
        `<p class="blad">
            Nie udało się pobrać danych z serwera. Sprawdź połączenie z internetem i odśwież stronę.
        </p>`;
    }
};

pokazInspiracje();