const podsumowanieEl = document.querySelector("#podsumowanie");
const listaEl = document.querySelector("#lista");

const budujListe = (lista) => {
    return lista.map(({tytul, utwory, rok}) => 
        `<li class="${rok>2000 ? "wyrozniony" : ""}">
            ${tytul} - ${utwory} utworów
        </li>`
    ).join("");
}

const przefiltrujIloscUtworow = (lista, iloscUtworowFilter) => lista.filter(({utwory}) => utwory >= iloscUtworowFilter);

const wyswietlPodsumowanie = (lista) => {
    return `Łączna liczba utworów na albumach: ${lista.reduce((ilosc, {utwory}) => ilosc + utwory, 0)}`;
}

const przeflitrowaneAlbumy = przefiltrujIloscUtworow(albumy, 9);

listaEl.innerHTML = budujListe(przeflitrowaneAlbumy);
podsumowanieEl.innerHTML = wyswietlPodsumowanie(przeflitrowaneAlbumy);