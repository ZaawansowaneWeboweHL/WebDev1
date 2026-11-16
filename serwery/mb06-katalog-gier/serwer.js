import express from 'express';
import {gry} from './dane.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Katalog gier planszowych");
});

app.get('/gry', (req, res) => {
    res.json(gry);
});

app.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}`);
});

