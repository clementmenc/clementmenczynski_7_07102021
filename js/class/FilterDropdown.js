import utils from "../modules/utils.js";

export default class FilterDropdown{
    constructor(type, items) {
        this.type = type;
        this.items = items;
        this.label = (type === "ingredient") ? "ingrédient" : type;

        this.create();
        FilterDropdown.instances = [...FilterDropdown.instances, this];
    }

    static instances = [];

    /**
     * Créer la vue du filtre "dropdown"
     */
    create = () => {
        // Création de contenant
        let container = document.createElement('div');
        container.setAttribute('class', `dropdown-item dd-${this.type}`);
        container.setAttribute('data-state', 'close');

        // Création du champ de recherche
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'dropdown-item__input');
        input.setAttribute('id', `${this.type}-input`);
        input.setAttribute('name', `${this.type}-input`);
        input.setAttribute('placeholder', `Rechercher un ${this.label}`);

        // Création du label
        let label = document.createElement('p');
        label.setAttribute('class', 'dropdown-item__label');
        label.innerText = `${this.label}s`;

        // Création de l'icon
        let icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon');
        this.closeIcon = icon;

        // Création de la liste d'élement
        let list = document.createElement('ul');
        list.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`);

        this.items.forEach(item => {
            let elem = document.createElement('li');
            elem.innerText = item;
            list.appendChild(elem);
        });

        // Ajout des éléments créer dans le contenant
        container.appendChild(input);
        container.appendChild(label);
        container.appendChild(icon);
        container.appendChild(list);

        // Ajout de l'écouteur de clique pour ouverture
        container.addEventListener('click', this.open)

        this.element = container;
    }

    /**
     * Ouvre le dropdown au clique de l'utilisateur
     * @param {PointerEvent} e 
     */
    open = (e) => {
        e.stopPropagation();
        
        FilterDropdown.instances.forEach(dropdown => {
            if (dropdown.element.getAttribute('data-state') === 'open' && dropdown.element !== this.element) {
                dropdown.element.setAttribute('data-state', 'close')
                document.removeEventListener('click', dropdown.close);
                dropdown.element.addEventListener('click', dropdown.open);
            }
        })

        if (this.element.getAttribute('data-state') === "close") {
            this.element.setAttribute('data-state', 'open');

            this.element.removeEventListener('click', this.open);
            document.addEventListener('click', this.close);
        }
    }

    /**
     * Ferme le dropdown si l'utilisateur clique sur l'icon ou si il clique en dehors de celui-ci
     * @param {PointerEvent} e 
     */
    close = (e) => {
        
        if (utils.clickOut(e.target, this.element) || e.target === this.closeIcon) {
            this.element.setAttribute('data-state', 'close');

            document.removeEventListener('click', this.close);
            this.element.addEventListener('click', this.open);
        }
    }
}