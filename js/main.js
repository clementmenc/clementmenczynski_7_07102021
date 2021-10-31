import DOM from "./utils/_dom.js";
import utils from "./utils/_utils.js";

import Api from "./class/Api.js";
import FilterDropdown from "./class/FilterDropdown.js";

await Api.init();

new FilterDropdown('ingredient', Api.getAllIngredients());
new FilterDropdown('appareil', Api.getAllAppliances());
new FilterDropdown('ustensil', Api.getAllUstensils());


FilterDropdown.instances.forEach(dropdown => {
    DOM.append(dropdown.element, document.getElementById('filters-dropdown'));
})
