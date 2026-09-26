const lista_umiejetnosci = [
    { nazwa: "C#", poziom: 4, kategoria: "backend" },
    { nazwa: "Javascript", poziom: 3, kategoria: "frontend" },
    { nazwa: "HTML", poziom: 4, kategoria: "frontend" },
    { nazwa: "CSS", poziom: 3, kategoria: "frontend" },
    { nazwa: "Git", poziom: 2, kategoria: "narzedzia" },
    { nazwa: "Praca w zespole", poziom: 3, kategoria: "miekkie" }
];

const lista = document.querySelector("#lista-umiejetnosci");

for (const umiejetnosc of lista_umiejetnosci) {
    let element = document.createElement("li");
    element.textContent = umiejetnosc;
    lista.appendChild(element);
}

const formularz = document.querySelector("#formularz-kontakt");
const komunikat = document.querySelector("#komunikat");

const pokaz_komunikat = (tresc, rodzaj) => {
    komunikat.textContent = tresc;
    komunikat.classList.remove("blad", "sukces");
    komunikat.classList.add(rodzaj);
}

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
})

let ilosc_klikniec = 0;
const ilosc_klikniec_blok = document.querySelector("#ilosc-klikniec");
const klikacz = document.querySelector("#klikacz");

klikacz.addEventListener("click", (event) => {
    if (ilosc_klikniec == 9999){
        ilosc_klikniec = 0;
    }
    ilosc_klikniec++;
    ilosc_klikniec_blok.textContent = String(ilosc_klikniec).padStart(4, "0");
})


