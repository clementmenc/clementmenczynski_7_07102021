import FilterDropdown from '../class/FilterDropdown.js';

const includes = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        if (current === target) {
            return true;
        }
    }
    return false;
}

const search = (filters, recipes) => {

    let principalSearch;

    if (document.getElementById('search-principal__input').value.length >= 3) {
        principalSearch = document.getElementById('search-principal__input').value
    }

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let visible = true;

        if (filters !== []) {
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

                if(!includes(allFilters, filter.name.toLowerCase())){
                    visible = false;
                }
            }
        }

        if (principalSearch !== undefined) {
            let search = principalSearch;

            for (let i = 0; i < recipe.ingredients.length; i++) {
                const current = recipe.ingredients[i];

                if(!includes(current.ingredient.toLowerCase(), search) && !includes(recipe.description.toLowerCase(), search) && !includes(recipe.name.toLowerCase(), search)){
                    visible = false;
                }
            }
        }
        
        if(includes(recipe.element.classList, "hidden") === visible) {
            recipe.toggleVisibility();
        }
    }


    FilterDropdown.updateDropDowns();


    if (document.querySelectorAll('.recipes-container .recipes:not(.hidden)').length === 0) {
        document.querySelector('.recipes-container .empty-msg').classList.add('visible');
    }else{
        document.querySelector('.recipes-container .empty-msg').classList.remove('visible');
    }

}

export default search;