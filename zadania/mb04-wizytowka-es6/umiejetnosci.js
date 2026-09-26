export const sredni_poziom = (lista) => {
    if (lista.length === 0) {
        return 0;
    }

    let suma = lista.reduce((razem, {poziom}) => razem + poziom, 0);
    return Math.round((suma/lista.length)*10) / 10;
};

export const przefiltruj = (lista, kategoria) => {
    if (kategoria === "wszystkie") return lista;
    return lista.filter(umiejetnosc => umiejetnosc.kategoria === kategoria);
};

export const podsumowanie = (lista) => {
    if (lista.length === 0) return "Brak umiejętności w tej kategorii."
    return `Umiejętności: ${lista.length} · średni poziom: ${sredni_poziom(lista)}`;
};

export const buduj_liste = (lista) => 
    lista.map(({nazwa, poziom}) => 
        `<li>
            <span class="nazwa">${nazwa}</span>
            <span class="poziom" title="Poziom ${poziom} z 5">${"●".repeat(poziom)}${"○".repeat(5-poziom)}</span>
        </li>`
    ).join("");