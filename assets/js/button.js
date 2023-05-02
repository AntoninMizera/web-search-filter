export default function createButton(name) {
    const link = document.createElement("a");

    link.classList.add("btn", "btn__filter");

    link.dataset.filtertext = name;
    link.href = `?search=${normalize(name)}`;

    hookButton(link);

    link.innerText = name;

    return link;
}

export function hookButton(link) {
    link.addEventListener("click", (ev) => {
        ev.preventDefault();

        filterBy(link.dataset.filtertext);

        history.pushState(undefined, "", link.href);
    });
}

export function filterBy(name) {
    const references = document.querySelectorAll(".reference__list a");
    const filters = document.querySelectorAll(".reference__filters a");

    for (const el of references) {
        if (!el.dataset.filtertext && name.toLowerCase() !== "all") {
            el.classList.add("hide");
            continue;
        }

        if (name.toLowerCase() === "all") {
            el.classList.remove("hide");
            continue;
        }

        const filters = el.dataset.filtertext.split(";");

        console.log(el, filters, name);

        // Allow both non-normalized and normalized forms
        if (!filters.find(n => normalize(n).toLowerCase() === normalize(name).toLowerCase())) {
            el.classList.add("hide");
            console.log(el, filters, name, "not found");
        }
        else console.log(el, filters, name, "found"), el.classList.remove("hide");
    }

    for (const filter of filters) {
        if (normalize(filter.dataset.filtertext).toLowerCase() !== normalize(name).toLowerCase()) {
            filter.classList.remove("btn__filter--active");
        }
        else filter.classList.add("btn__filter--active");
    }
}

/**
 * Normalizes a string into an acceptable form - works only for Latin characters
 * @param {String} str An input stirng
 */
export function normalize(str) {
    const normalized = str.replace(/[\s]/g, "-").normalize("NFKD");

    const nonPrintableStripped = normalized.replace(/[^\x20-\x7e]/g, "");

    return nonPrintableStripped;
}