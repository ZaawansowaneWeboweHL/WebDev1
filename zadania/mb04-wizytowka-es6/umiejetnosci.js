/**
 * Zwraca średni poziom umiejętności z podanej listy.
 *
 * @param {Array<{poziom: number}>} lista - Lista umiejętności z określonym poziomem.
 * @returns {number} Średni poziom zaokrąglony do jednego miejsca po przecinku. W razie pustej listy zwraca 0.
 */
export const sredni_poziom = (lista) => {
    if (lista.length === 0) {
        return 0;
    }

    let suma = lista.reduce((razem, {poziom}) => razem + poziom, 0);
    return Math.round((suma/lista.length)*10) / 10;
};

/**
 * Filtruje listę umiejętności według podanej kategorii.
 *
 * @param {Array<Object>} lista - Pełna lista umiejętności.
 * @param {string} kategoria - Nazwa kategorii do wyfiltrowania.
 * @returns {Array<Object>} Lista umiejętności z wybranej kategorii lub pełna lista.
 */
export const przefiltruj = (lista, kategoria) => {
    if (kategoria === "wszystkie") return lista;
    return lista.filter(umiejetnosc => umiejetnosc.kategoria === kategoria);
};

/**
 * Tworzy podsumowanie dla wybranej listy umiejętności.
 *
 * @param {Array<Object>} lista - Lista umiejętności do podsumowania.
 * @returns {string} Tekst z liczbą umiejętności i średnim poziomem lub w razie pustej listy informacja o braku umiejętności
 */
export const podsumowanie = (lista) => {
    if (lista.length === 0) return "Brak umiejętności w tej kategorii."
    return `Umiejętności: ${lista.length} · średni poziom: ${sredni_poziom(lista)}`;
};

/**
 * Buduje HTML z listą umiejętności.
 *
 * @param {Array<{nazwa: string, poziom: number}>} lista - Lista umiejętności do wypisania.
 * @returns {string} HTML z elementami listy umiejętności.
 */
export const buduj_liste = (lista) => 
    lista.map(({nazwa, poziom}) => 
        `<li>
            <span class="nazwa">${nazwa}</span>
            <span class="poziom" title="Poziom ${poziom} z 5">${"●".repeat(poziom)}${"○".repeat(5-poziom)}</span>
        </li>`
    ).join("");