import DOM from "./modules/dom.js";
import Api from "./class/Api.js";
import FilterDropdown from "./class/FilterDropdown.js";
import Tags from "./class/Tags.js";
import Recipe from "./class/Recipe.js";
import search from "./modules/search.js";

const searchPrincipal = document.getElementById('search-principal__input');

try {
    await Api.init();

    // Créer chaque tag ingrédients, appareils et ustensiles en les récupérant depuis l'api
        const ingredients = Api.getAllIngredients().map(ingredient => {
            return new Tags('ingredient', ingredient);
        });

        const appareil = Api.getAllAppliances().map(appareil => {
            return new Tags('appareil', appareil);
        });

        const ustensils = Api.getAllUstensils().map(ustensil => {
            return new Tags('ustensile', ustensil);
        });

    // Créer chaque liste déroulante avec les tags associés
        new FilterDropdown('ingredient', ingredients);
        new FilterDropdown('appareil', appareil);
        new FilterDropdown('ustensile', ustensils);

    // Ajoute les liste déroulante au DOM
        FilterDropdown.instances.forEach(dropdown => {
            DOM.append(dropdown.element, document.getElementById('filters-dropdown'));
        });

    // Créer chaque recette et les ajoute au DOM
        Api.getAllRecipes().forEach(recipe => {
            let item = new Recipe(recipe);
            DOM.append(item.view(), document.getElementById("recipes-container"));
        });


    // Écouteur de saisi de l'utilisateur sur la barre de recherche principal
        searchPrincipal.addEventListener('input', (e) => {
            // Si la saisi contient au moins 3 caractère, lance la fonction de tri 
            if (e.target.value.length >= 3 || e.inputType === "deleteContentBackward") {
                search(Tags.active, Recipe.instances);
            }
        })
} catch (error) {
    let errorMsg = document.createElement('h2');
    errorMsg.setAttribute('class', 'error-msg');
    errorMsg.innerText = error;

    document.body.appendChild(errorMsg);
}