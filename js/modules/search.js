import FilterDropdown from '../class/FilterDropdown.js';

const search = (filters, recipes) => {
    console.time("algo1");

    let principalSearch;

    if (document.getElementById('search-principal__input').value.length >= 3) {
        principalSearch = document.getElementById('search-principal__input').value
    }

    recipes.forEach(recipe => {
        let visible = true;

        if (filters !== []) {
            let allFilters = [recipe.appareils.toLowerCase()];
            allFilters = allFilters.concat(recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
            allFilters = allFilters.concat(recipe.ustensils.map(ustensil => ustensil.toLowerCase()));

            filters.forEach(filter => {
                if(!allFilters.includes(filter.name.toLowerCase())){
                    visible = false;
                }
            })
        }

        if (principalSearch !== undefined) {
            let search = principalSearch;

            recipe.ingredients.forEach(current => {
                if (!current.ingredient.toLowerCase().includes(principalSearch) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)) {
                    visible = false;
                }
            });
        }

        if (recipe.element.classList.contains("hidden") === visible) {
            recipe.toggleVisibility();
        }
    });

    


    FilterDropdown.updateDropDowns();


    if (document.querySelectorAll('.recipes-container .recipes:not(.hidden)').length === 0) {
        document.querySelector('.recipes-container .empty-msg').classList.add('visible');
    }else{
        document.querySelector('.recipes-container .empty-msg').classList.remove('visible');
    }

    console.timeEnd("algo1");

}

export default search;