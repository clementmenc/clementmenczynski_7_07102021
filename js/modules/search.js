import FilterDropdown from '../class/FilterDropdown.js';

const search = (filters, recipes) => {

    const searchBar = document.getElementById('search-principal__input');
    const search = (searchBar.value.length >= 3) ? searchBar.value : null;

    /**
     * Boucle sur chaque recette et test s'il y a une correspondance avec les filtres ou la recherche de l'utilisateur
     */
    recipes.forEach(recipe => {
        let visible = true;

        if (filters.length > 0) {
            const appareils = [recipe.appareils.toLowerCase()];
            const ingrédients = recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase());
            const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
            const allFilters = [...appareils, ...ingrédients, ...ustensils];

            filters.forEach(filter => {
                if(!allFilters.includes(filter.name.toLowerCase())){
                    visible = false;
                }
            })
        }

        if (search) {
            recipe.ingredients.forEach(current => {
                if (!current.ingredient.toLowerCase().includes(search) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)) {
                    visible = false;
                }
            });
        }

        if (recipe.element.classList.contains("hidden") === visible) {
            recipe.toggleVisibility();
        }
    });


    FilterDropdown.updateDropDowns(); // Met à jour les filtres disponibles

    // Si aucune recette ne correspond, affiche un message à l'utilisateur qu'aucune recette ne correspond à sa recherche
    if (document.querySelectorAll('.recipes-container .recipes:not(.hidden)').length === 0) {
        document.querySelector('.recipes-container .empty-msg').classList.add('visible');
    }else{
        document.querySelector('.recipes-container .empty-msg').classList.remove('visible');
    }

}

export default search;