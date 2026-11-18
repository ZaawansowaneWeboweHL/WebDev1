import { Router } from 'express';
import { gry } from '../dane.js';

const router = Router();

/** GET /gry - pełna lista gier w katalogu. */
router.get('/', (req, res) => {
    res.json(gry);
});

/** GET /gry/:id - jedna gra o podanym numerze; brak gry = 404. */
router.get('/:id', (req, res) => {
    const szukane = Number(req.params.id);
    const gra = gry.find((g) => g.id === szukane);

    if (!gra){
        res.status(404).json({ blad: "Nie znaleziono gry o takim numerze." });
        return;
    }

    res.json(gra);
});

export default router;