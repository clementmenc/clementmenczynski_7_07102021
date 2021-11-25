import FilterDropdown from '../class/FilterDropdown.js';

const search = (filters, recipes) => {

    const searchBar = document.getElementById('search-principal__input');

    const search = (searchBar.value.length >= 3) ? searchBar.value : null;

    
    /**
     * Boucle sur chaque recette et test s'il y a une correspondance avec les filtres ou la recherche de l'utilisateur
     */
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let visible = true;

        if (filters.length > 0) {
            let appareil = recipe.appareils.toLowerCase();
            let ingredients = recipe.ingredients;
            let ustensils = recipe.ustensils;
            let allFilters = [appareil];


            for (let i = 0; i < ingredients.length; i++) {
                const current = ingredients[i].ingredient.toLowerCase();
                
                allFilters = [...allFilters, current];
            }

            for (let i = 0; i < ustensils.length; i++) {
                const current = ustensils[i].toLowerCase();
                
                allFilters = [...allFilters, current];
            }

            for (let i = 0; i < filters.length; i++) {
                let filter = filters[i];

                if(!allFilters.includes(filter.name.toLowerCase())){
                    visible = false;
                }
            }
        }

        if (search !== null) {

            for (let i = 0; i < recipe.ingredients.length; i++) {
                const current = recipe.ingredients[i];

                if(!current.ingredient.toLowerCase().includes(search) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)){
                    visible = false;
                }
            }
        }
        
        if(recipe.element.classList.contains("hidden") === visible) {
            recipe.toggleVisibility();
        }
    }


    FilterDropdown.updateDropDowns(); // Met à jour les filtres disponibles

    // Si aucune recette ne correspond, affiche un message à l'utilisateur qu'aucune recette ne correspond à sa recherche
    if (document.querySelectorAll('.recipes-container .recipes:not(.hidden)').length === 0) {
        document.querySelector('.recipes-container .empty-msg').classList.add('visible');
    }else{
        document.querySelector('.recipes-container .empty-msg').classList.remove('visible');
    }

}

export default search;