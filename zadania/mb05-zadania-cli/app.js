import { wczytaj, zapisz } from "./magazyn.js";

const [, , komenda, argument] = process.argv;

const pokazListe = async () => {
    const zadania = await wczytaj();

    if (zadania.length === 0) {
        console.log("Brak zadań.");
        return;
    }
    zadania.forEach(({ tekst, zrobione }, i) => {
        console.log(`${i + 1}. [${zrobione ? "x" : " "}] ${tekst}`);
    });
};

const dodajZadanie = async (tekst) => {

    if (!tekst || tekst.trim() === "") {
        console.error("Błąd: podaj treść zadania, np. npm run dodaj -- \"Kupić mleko\"");
        return;
    }

    const zadania = await wczytaj();
    const nowe = [...zadania, { tekst: tekst.trim(), zrobione: false}];

    await zapisz(nowe);
    console.log(`Dodano zadanie nr ${nowe.length}: ${tekst.trim()}`);
};

const oznaczZrobione = async (tekstNumeru) => {
    const zadania = await wczytaj();
    const numer = Number(tekstNumeru);

    if (!Number.isInteger(numer) || numer < 1 || numer > zadania.length) {
        console.error(`Błąd: podaj numer zadania od 1 do ${zadania.length}.`);
        return;
    }

    const nowe = zadania.map((zadanie, i) =>
        i === numer - 1 ? { ...zadanie, zrobione: true } : zadanie
    );

    await zapisz(nowe);
    console.log(`Zadanie nr ${numer} oznaczone jako zrobione: ${nowe[numer - 1].tekst}`);
};

const pokazPomoc = () => {
    console.log("Użycie:");
    console.log(" npm run lista");
    console.log(" npm run dodaj -- \"tekst zadania\"");
    console.log(" npm run zrobione -- numer");
};

switch (komenda) {
    case "lista":
        await pokazListe();
        break;
    case "dodaj":
        await dodajZadanie(argument);
        break;
    case "zrobione":
        await oznaczZrobione(argument);
        break;
    default:
        pokazPomoc();
}