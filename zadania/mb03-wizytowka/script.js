let lista_umiejetnosci = ["Matematyka", "C#", "JavaScript", "HTML", "CSS"];

const lista = document.querySelector("#lista-umiejetnosci");

for (const umiejetnosc of lista_umiejetnosci) {
    let element = document.createElement("li");
    element.textContent = umiejetnosc;
    lista.appendChild(element);
}