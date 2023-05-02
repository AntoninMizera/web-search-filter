import createButton, {filterBy, hookButton, normalize} from "./button.js";

document.addEventListener("DOMContentLoaded", () => {
    const filterEntries = [];
    const references = document.querySelectorAll(".reference__list a[data-filtertext]");

    for (const el of references) {
        if (!el.dataset.filter || !el.dataset.filtertext) continue;

        const filterTexts = el.dataset.filtertext.split(";");
        filterEntries.push(...filterTexts.filter(x => !filterEntries.includes(x)));
    }

    const filters = document.querySelector(".reference__filters");

    for (const el of filters.querySelectorAll("a[data-filtertext]")) {
        hookButton(el);
    }

    for (const filterEntry of filterEntries) {
        filters.append(createButton(filterEntry));
    }

    const urlSp = new URLSearchParams(window.location.search.slice(1));

    if (urlSp.has("search") && (filterEntries
        .find(x => normalize(x.toLowerCase()) === urlSp.get("search").toLowerCase()) ||
        urlSp.get("search") === "all")) {
        filterBy(urlSp.get("search"));
    }
});