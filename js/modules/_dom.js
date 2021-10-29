/**
 * Ajoute un élément à la fin d'un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const append = (element, target) => {
    target.appendChild(element);
}

/**
 * Remplace un élément par un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const replace = (element, target) => {
    target.parentNode.replaceChild(element, target);
}

/**
 * Ajoute un élément avant un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const insertBefore = (element, target) => {
    target.parentNode.insertBefore(element, target);
}

/**
 * Ajoute un élément après un autre élément
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const insertAfter = (element, target) => {
    target.after(element);
}

const dom = {
    append,
    replace,
    insertBefore,
    insertAfter
}

export default dom;