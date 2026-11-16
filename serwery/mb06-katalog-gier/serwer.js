import express from 'express';
import {gry} from './dane.js';

const app = express();
const PORT = 3000;

/** GET / - strona powitalna z listą dostępnych adresów. */
app.get('/', (req, res) => {
    res.send(`
        <h1>Katalogg gier planszowych</h1>
        <ul>
            <li><a href="/gry">/gry</a> - wszystkie gry</li>
            <li><a href="/gry/1">/gry/:id</a> - jedna gra</li>
            <li><a href="/szukaj?max=150">/szukaj?wydawca=&max=&gracze=</a> - wyszukiwanie</li>
            <li><a href="/statystyki">/statystyki</a> - podsumowanie katalogu</li>
        </ul>
    `);
});

/** GET /gry - pełna lista gier w katalogu. */
app.get('/gry', (req, res) => {
    res.json(gry);
});

/** GET /gry/:id - jedna gra o podanym numerze; brak gry = 404. */
app.get('/gry/:id', (req, res) => {
    const szukane = Number(req.params.id);
    const gra = gry.find((g) => g.id === szukane);

    if (!gra){
        res.status(404).json({ blad: "Nie znaleziono gry o takim numerze." });
        return;
    }

    res.json(gra);
});

/** GET /szukaj?wydawca=&max=&gracze= - filtrowanie katalogu; brak parametrów = cała lista. */
app.get('/szukaj', (req, res) => {
    const { wydawca, max, gracze } = req.query;
    let wynik = gry;

    if (wydawca){
        wynik = wynik.filter((w) => w.wydawca.toLowerCase() === wydawca.toLowerCase());
    }
    if (max){
        wynik = wynik.filter((w) => w.cena <= Number(max));
    }
    if (gracze){
        wynik = wynik.filter((w) => w.gracze >= Number(gracze))
    }

    res.json(wynik);
});

/** GET /statystyki - liczba gier, średnia cena i nazwa najdroższej gry. */
app.get('/statystyki', (req, res) => {
    const sumaCen = gry.reduce((suma, g) => suma + g.cena, 0);
    const srednia = sumaCen / gry.length;
    const najdrozsza = gry.reduce((a, b) => (b.cena > a.cena ? b : a));

    res.json({
        liczbaGier: gry.length,
        sredniaCena: Math.round(srednia*100)/100,
        najdrozsza: najdrozsza.nazwa
    });
});

app.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}`);
});
