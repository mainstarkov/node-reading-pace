const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const output = form.querySelector("output");
    const pages = Math.ceil(Number(values.get("pages")) / Number(values.get("days")));
    output.textContent = `${pages} стр. в день`;
});
