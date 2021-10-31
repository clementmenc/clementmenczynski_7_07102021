/**
 * Contôle si le clique à eu lieu à l'extérieur d'un élément
 * @param {HTMLElement} target Element cliqué
 * @param {HTMLElement} ref Element de référence 
 * @returns {boolean}
 */
const clickOut = (target, ref) => {
    return !ref.contains(target)
}


const utils = {
    clickOut
}

export default utils;