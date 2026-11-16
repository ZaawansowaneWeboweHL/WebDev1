import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Katalog gier planszowych");
});

app.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}`);
});

