import DOM from "../modules/dom.js";
import search from "../modules/search.js";
import Recipe from "./Recipe.js";
import FilterDropdown from "./FilterDropdown.js";

export default class Tags{
    constructor(type, name) {
        this.type = type;
        this.name = name.toLowerCase();
    
        Tags.instances = [...Tags.instances, this];
    }

    static instances = [];
    static active = []

    /**
     * Créer la vue d'un tag
     * @returns {HTMLElement}
     */
    tag = () => {

        if (this.tagRes) { return this.tagRes; }

        let element = document.createElement('li');
        element.setAttribute('class', `tag tag-${this.type}`);

        let deleteBtn = document.createElement('i');
        deleteBtn.setAttribute('class', 'far fa-times-circle tag__icon');
        deleteBtn.addEventListener('click', this.delete)

        element.innerText = this.name;
        element.appendChild(deleteBtn);

        this.tagRes = element;
        return element;
    }

    /**
     * Créer la vue d'un tag avec le style d'une list (pour dropdown)
     * @returns {HTMLElement}
     */
    listElement = () => {

        if (this.listElementRes) { return this.listElementRes; }

        let element = document.createElement('li');
        element.setAttribute('data-value', this.name);
        element.innerText = this.name;

        element.addEventListener('click', this.add);

        this.listElementRes = element;
        return element;
    }

    /**
     * Ajout le tag au tags actif et l'affiche sur la page
     */
    add = () => {
        Tags.active = [...Tags.active, this];

        DOM.append(this.tag(), document.getElementById('tags-list'));
        search(Tags.active, Recipe.instances);
        this.listElementRes.classList.add('already-selected');
        FilterDropdown.updateDropDowns();
    }

    /**
     * Supprime le tag des tags actif et le supprime de la page
     */
    delete = () => {
        let newActiveTags = Tags.active.filter(tag => tag !== this);
        Tags.active = newActiveTags;

        DOM.remove(this.tag());
        search(Tags.active, Recipe.instances);
        this.listElementRes.classList.remove('already-selected');
        FilterDropdown.updateDropDowns();
    }
}