import createButton, {filterBy, hookButton} from "./button.js";

document.addEventListener("DOMContentLoaded", () => {
    const filterMap = {};
    const references = document.querySelectorAll(".reference__list a[data-filter]");

    for (const el of references) {
        if (!el.dataset.filter || !el.dataset.filtertext) continue;

        const filters = el.dataset.filter.split(";");
        const filterTexts = el.dataset.filtertext.split(";");

        for (let i = 0; i < filters.length; i++) {
            if (Object.prototype.hasOwnProperty.call(filterMap, filters[i])) continue;

            filterMap[filters[i]] = filterTexts[i];
        }
    }

    const filters = document.querySelector(".reference__filters");

    for (const el of filters.querySelectorAll("a[data-filter]")) {
        hookButton(el);
    }

    for (const [k, v] of Object.entries(filterMap)) {
        filters.append(createButton(v, k));
    }

    const urlSp = new URLSearchParams(window.location.search.slice(1));

    if (urlSp.has("search") && (Object.keys(filterMap).includes(urlSp.get("search")) || urlSp.get("search") === "all")) {
        filterBy(urlSp.get("search"));
    }
});