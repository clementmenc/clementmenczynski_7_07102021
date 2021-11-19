import DOM from "./modules/dom.js";
import utils from "./modules/utils.js";

import Api from "./class/Api.js";
import FilterDropdown from "./class/FilterDropdown.js";
import Tags from "./class/Tags.js";
import Recipe from "./class/Recipe.js";
import search from "./modules/search.js";

await Api.init();

let ingredients = Api.getAllIngredients().map(ingredient => {
    return new Tags('ingredient', ingredient);
});

let appareil = Api.getAllAppliances().map(appareil => {
    return new Tags('appareil', appareil);
});

let ustensils = Api.getAllUstensils().map(ustensil => {
    return new Tags('ustensile', ustensil);
});

new FilterDropdown('ingredient', ingredients);
new FilterDropdown('appareil', appareil);
new FilterDropdown('ustensile', ustensils);


FilterDropdown.instances.forEach(dropdown => {
    DOM.append(dropdown.element, document.getElementById('filters-dropdown'));
});

Api.getAllRecipes().forEach(recipe => {
    let item = new Recipe(recipe);
    DOM.append(item.view(), document.getElementById("recipes-container"));
});


const searchPrincipal = document.getElementById('search-principal__input');

searchPrincipal.addEventListener('input', (e) => {

    if (e.target.value.length >= 3 || e.inputType === 'deleteContentBackward') {
        search(Tags.active, Recipe.instances);
    }
})