let lista_umiejetnosci = ["Matematyka", "C#", "JavaScript", "HTML", "CSS"];

const lista = document.querySelector("#lista-umiejetnosci");

for (const umiejetnosc of lista_umiejetnosci) {
    let element = document.createElement("li");
    element.textContent = umiejetnosc;
    lista.appendChild(element);
}

const formularz = document.querySelector("#formularz-kontakt");
const komunikat = document.querySelector("#komunikat");

function pokaz_komunikat(tresc, rodzaj){
    komunikat.textContent = tresc;
    komunikat.classList.remove("blad", "sukces");
    komunikat.classList.add(rodzaj);
}

formularz.addEventListener("submit", (event) => {
    event.preventDefault();

    let imie = document.querySelector("#imie").value;
    let email = document.querySelector("#email").value;
    let temat = document.querySelector("#temat").value;
    let tresc = document.querySelector("#tresc").value;

    if (imie === ""){
        pokaz_komunikat("Podaj imię.", "blad");
        return ;
    }
    
    if (email === ""){
        pokaz_komunikat("Podaj email.", "blad");
        return ;
    }
    
    if (temat === ""){
        pokaz_komunikat("Wybierz temat.", "blad");
        return ;
    }

    pokaz_komunikat("Imię: " + imie + "\nTemat: " + temat, "sukces");

    formularz.reset()
})