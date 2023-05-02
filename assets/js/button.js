export default function createButton(name, ref) {

    const link = document.createElement("a");

    link.classList.add("btn", "btn__filter");

    link.dataset.filter = ref;
    link.href = `?search=${ref}`;

    hookButton(link);

    link.innerText = name;

    return link;
}

export function hookButton(link) {
    link.addEventListener("click", (ev) => {
        ev.preventDefault();

        filterBy(link.dataset.filter);

        history.pushState(undefined, "", link.href);
    });
}

export function filterBy(name) {
    const references = document.querySelectorAll(".reference__list a[data-filter]");
    const filters = document.querySelectorAll(".reference__filters a[data-filter]");

    for (const el of references) {
        if (!el.dataset.filter) continue;

        if (name === "all") el.classList.remove("hide");

        const filters = el.dataset.filter.split(";");

        if (filters.includes(name)) el.classList.add("hide");
        else el.classList.remove("hide");
    }

    for (const filter of filters) {
        if (filter.dataset.filter !== name) filter.classList.remove("btn__filter--active");
        else filter.classList.add("btn__filter--active");
    }
}