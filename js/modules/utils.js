/**
 * Contôle si le clique à eu lieu à l'extérieur d'un élément
 * @param {HTMLElement} target Element cliqué
 * @param {HTMLElement} ref Element de référence 
 * @returns {boolean}
 */
const clickOut = (target, ref) => {
    return !ref.contains(target)
}

/**
 * Tronque une chaine de caractère un à index donné
 * @param {string} str 
 * @param {number} index 
 * @returns 
 */
const truncateStringEllipsis = (str, index) => {
    let strSliced = str.slice(0, index);
    let strSplited = strSliced.split(' ');

    return strSliced.slice(0, (index - strSplited[strSplited.length - 1].length) - 1) + "...";
}

const utils = {
    clickOut,
    truncateStringEllipsis
}

export default utils;