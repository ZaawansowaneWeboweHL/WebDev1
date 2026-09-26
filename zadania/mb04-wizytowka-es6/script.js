const lista_umiejetnosci = [
    { nazwa: "C#", poziom: 4, kategoria: "backend" },
    { nazwa: "Javascript", poziom: 3, kategoria: "frontend" },
    { nazwa: "HTML", poziom: 4, kategoria: "frontend" },
    { nazwa: "CSS", poziom: 3, kategoria: "frontend" },
    { nazwa: "Git", poziom: 2, kategoria: "narzedzia" },
    { nazwa: "Praca w zespole", poziom: 3, kategoria: "miekkie" }
];

const lista = document.querySelector("#lista-umiejetnosci");

const buduj_liste = (lista) => 
    lista.map(({nazwa, poziom}) => 
        `<li>
            <span class="nazwa">${nazwa}</span>
            <span class="poziom" title="Poziom ${poziom} z 5">${"●".repeat(poziom)}${"○".repeat(5-poziom)}</span>
        </li>`
    ).join("");

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

const sredni_poziom = (lista) => {
    if (lista.length === 0) {
        return 0;
    }

    let suma = lista.reduce((razem, {poziom}) => razem + poziom, 0);
    return Math.round((suma/lista.length)*10) / 10;
};

const przefiltruj = (lista, kategoria) => {
    if (kategoria === "wszystkie") return lista;
    return lista.filter(umiejetnosc => umiejetnosc.kategoria === kategoria);
};

const podsumowanie = (lista) => {
    if (lista.length === 0) return "Brak umiejętności w tej kategorii."
    return `Umiejętności: ${lista.length} · średni poziom: ${sredni_poziom(lista)}`;
};

// Obsługa kliknięć
const podsumowanieEl = document.querySelector("#podsumowanie");
const filtryEl = document.querySelector("#filtry");

const pokaz_umiejetnosci = (kategoria = "wszystkie") => {
    const wybrane = przefiltruj(lista_umiejetnosci, kategoria);

    lista.innerHTML = buduj_liste(wybrane);
    podsumowanieEl.textContent = podsumowanie(wybrane);
}

filtryEl.addEventListener("click", (event) => {
    const przycisk = event.target.closest("button");

    if (!przycisk) return;

    filtryEl.querySelectorAll("button").forEach(b => b.classList.remove("aktywny"));
    przycisk.classList.add("aktywny");

    pokaz_umiejetnosci(przycisk.dataset.kategoria);
});