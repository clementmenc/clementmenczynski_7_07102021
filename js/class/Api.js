/**
 * Cette classe simule une api, elle devra être modifier pour mise en prod une fois l'api créer
 */
export default class Api{

    static recipes = [];
    static allIngredients = [];
    static allAppliances = [];
    static allUstensils = [];

    /**
     * Simule une connection à une base de donnée avec un fichier json
     */
    static init = async () => {
        const req = await fetch('./recipes.json');
        const data = await req.json();
        Api.recipes = data.recipes;
    }

    /**
     * Récupère tous les ingrédients de toutes les recettes
     * @returns {array} Tableau contenant tous les ingrédients de toutes les recettes
     */
    static getAllIngredients = () => {

        if (Api.allIngredients.length === 0) {
            Api.recipes.forEach(recipe => {
                recipe.ingredients.map( ingredients => {
                    const ingredient =  ingredients.ingredient;

                    if (!Api.allIngredients.includes(ingredient)) {
                        Api.allIngredients = [...Api.allIngredients, ingredient];
                    }
                })
            })
        }

        return Api.allIngredients;
    }

    /**
     * Récupère tous les appareils de toutes les recettes
     * @returns {array} Tableau contenant tous les appareils de toutes les recettes
     */
    static getAllAppliances = () => {

        if (Api.allAppliances.length === 0) {
            Api.recipes.forEach(recipe => {
                Api.allAppliances = [...Api.allAppliances, recipe.appliance];
            })
        }

        return Api.allAppliances;
    }

    /**
     * Récupère tous les ustensiles de toutes les recettes
     * @returns {array} Tableau contenant tous les ustensiles de toutes les recettes
     */
    static getAllUstensils = () => {
        if (Api.allUstensils.length === 0) {
            Api.recipes.forEach(recipe => {
                recipe.ustensils.map( ustensil => {

                    if (!Api.allUstensils.includes(ustensil)) {
                        Api.allUstensils = [...Api.allUstensils, ustensil];
                    }
                })
            })
        }

        return Api.allUstensils;
    }

    /**
     * Récupère toutes les recettes existantes
     */
    static getAllRecipes = () => {
        return Api.recipes;
    }

    /**
     * Récupère une recette avec son id
     * @param {number} id 
     * @returns {object} Objet contenant tous les détails de la recette
     */
    static getRecipe = (id) => {
        const recipe = Api.recipes.filter(recipe => recipe.id === id);

        if (recipe.length !== 1) {
            console.error("Recette introuvable.");
            return;
        }
        return recipe[0];
    }
}