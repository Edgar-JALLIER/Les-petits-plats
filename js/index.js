const template = document.querySelector("#mon-template");
const sectionRecette = document.querySelector(".ma-section-recette");
const searchBar = document.getElementById("search");
const monContainer = document.querySelector(".ma-section-recette");
const errorMessage = document.querySelector(".errorMessage");
const containerTagIngredients = document.querySelector(
  ".container-all-ingredients"
);

// 3 Inputs de filtre
const filterTagIngredients = document.querySelector("#filter-ingredients");
const filterTagAppareils = document.querySelector("#filter-appareils");
const filterTagUstensiles = document.querySelector("#filter-ustensiles");

// 3 search bar différentes
const SearchBarIngredients = document.querySelector("#search-bar-ingredients");
const SearchBarAppareils = document.querySelector("#search-bar-appareils");
const SearchBarUstensiles = document.querySelector("#search-bar-ustensiles");

// 3 div pour placer les filtres sélectionnées
const mesTagsIngredients = document.querySelector("#tag-ingredient");
const mesTagsAppareils = document.querySelector("#tag-appareils");
const mesTagsUstensiles = document.querySelector("#tag-ustensiles");

const miniSearchBar = document.querySelector(".search-bar-mini");

// 3 tableau de filtres
const mySetOfIngredients = new Set();
const mySetOfAppareils = new Set();
const mySetOfUstensiles = new Set();

// Objet pour répertorier les filtre sélectionnées
const allFilterSelected = {
  ingredients: [],
  appareils: [],
  ustensiles: [],
};

// Tbaleau avec toutes les recettes créé après la récupération des données
let tableauDesRecettes = [];

// Fonction de récupération de la data des recettes
async function getRecettes() {
  try {
    const response = await fetch("/data/data-recettes.json");
    if (response.ok) {
      const responseJson = await response.json();

      //création du tableau de toutes les recettes
      for (const element of responseJson.recipes) {
        tableauDesRecettes.push(element);
      }

      return responseJson.recipes;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Fonction d'appel de la fonction de création du DOM des recettes
async function createRecetteDom(recettes) {
  const monContainer = document.querySelector(".all-recette-container");

  if (monContainer) {
    monContainer.remove();
  }

  const createContainer = document.createElement("section");
  createContainer.setAttribute("class", "all-recette-container");
  const nombreDeRecette = document.querySelector(".tag-for-recette-number");
  nombreDeRecette.innerHTML = `${recettes.length} RECETTES`;
  recettes.forEach((recette) => {
    const maRecette = document.createElement("div");
    maRecette.setAttribute("class", "recette-card");
    maRecette.innerHTML = `
        <div class="recette-card">
          <div class="recette-card__image">
            <div class="recette-card__div-time">
              <p class="recette-card__p-time">${recette.time} min</p>
            </div>
            <img class="recette-card__photo" src='../assets/photos-recettes/Recette${recette.id}.jpg' alt="" />
          </div>
          <div class="recette-card__text-container">
          <div class="recette-card__title">
            <h2 class="recette-card__title">${recette.name}</h2>
          </div>
          <div class="recette-card__ingredients-instruction">
            <p class="recette-card__title-min">RECETTE</p>
            <p class="recette-card__description">${recette.description}</p>
            <p class="recette-card__title-min">INGRÉDIENTS</p>
            <ul class="recette-card__ingredient-list">
            <div class="recette-card__ingredient-container" id="${recette.id}"></div>
            </ul>
          </div>
        </div>
      </div>`;

    createContainer.appendChild(maRecette);
    sectionRecette.appendChild(createContainer);
    affichageIngredient(recette);
  });
  affichageIngredientDesFiltres(recettes);
  affichageAppareilsDesFiltres(recettes);
  affichageUstensilesDesFiltres(recettes);
}

// Fonction pour afficher une liste de tous les ingrédients d'une recette dans une card (l'ingrédient, la quantité, l'unité de mesure)
function affichageIngredient(uneRecette) {
  uneRecette.ingredients.forEach((e) => {
    const maListe = document.getElementById(`${uneRecette.id}`);
    const mesIngredients = document.createElement("li");
    const monIngredient = document.createElement("span");
    const spanQuantity = document.createElement("span");
    const spanUnit = document.createElement("span");
    const maQuantity = e.quantity ? e.quantity : "";
    const monUnit = e.unit ? e.unit : "";

    mesIngredients.setAttribute("class", "recette-card__ingredient-item");
    monIngredient.setAttribute("class", "recette-card__ingredient-item-bold");
    monIngredient.innerHTML = `${e.ingredient} <br>`;
    mesIngredients.appendChild(monIngredient);

    // Condition si l'ingrédient n'a pas de quantité ou d'unité alors ne créé rien
    if (maQuantity != "") {
      spanQuantity.innerHTML = `${maQuantity}`;
      mesIngredients.appendChild(spanQuantity);
    }
    if (monUnit != "") {
      spanUnit.innerHTML = ` ${monUnit}`;
      mesIngredients.appendChild(spanUnit);
    }

    // Ajout de mon ingrédient dans la liste de tous les ingrédients de ma recette
    maListe.appendChild(mesIngredients);
  });
}

// Fonction qui permet d'initialiser les fonctions : récup les données et afficher le DOM
async function initialisationDeToutesLesRecettes() {
  const mesRecettes = await getRecettes();
  await createRecetteDom(mesRecettes);
}
initialisationDeToutesLesRecettes();

// Ajout du filtre cliqué dans le DOM + ajout dans le tableau de filtre
function ajoutFiltre(monItem, filterCategorie) {
  const nomDuTag = monItem.target.textContent;
  const newDivTag = document.createElement("div");
  const tagPourIdUnique = nomDuTag.replace(/ /g, "-").replace(/[()']/g, "");

  newDivTag.innerHTML = `${nomDuTag} <i class="fa-solid fa-xmark ${tagPourIdUnique}"></i>`;

  if (filterCategorie == "ingredients") {
    newDivTag.setAttribute("class", "my-tag ingredient");
    mesTagsIngredients.appendChild(newDivTag);
    filterTagIngredients.nextElementSibling.classList.add("hide");
    filterTagIngredients.style.setProperty("--deg", "0deg");
    // Ajout du tag dans le tableau correspondant => ici ingredients
    allFilterSelected[filterCategorie].push(nomDuTag);
    rechercheDeRecetteParTagIngredient();
  }

  if (filterCategorie == "appareils") {
    newDivTag.setAttribute("class", "my-tag appareil");
    mesTagsAppareils.appendChild(newDivTag);
    filterTagAppareils.nextElementSibling.classList.add("hide");
    filterTagAppareils.style.setProperty("--deg", "0deg");
    allFilterSelected[filterCategorie].push(nomDuTag);
    rechercheDeRecetteParTagAppareil();
  }

  if (filterCategorie == "ustensiles") {
    newDivTag.setAttribute("class", "my-tag ustensile");
    mesTagsUstensiles.appendChild(newDivTag);
    filterTagUstensiles.nextElementSibling.classList.add("hide");
    filterTagUstensiles.style.setProperty("--deg", "0deg");
    allFilterSelected[filterCategorie].push(nomDuTag);
    rechercheDeRecetteParTagUstensile();
  }

  const croix = document.querySelector(`.${tagPourIdUnique}`);
  croix.addEventListener("click", removeFilterTag);
}

// Permet de supprimer un filtre
function removeFilterTag(maCroix) {
  const monTag = maCroix.target.parentElement;
  const contentTag = monTag.textContent;
  const tableauFiltreIngredients = allFilterSelected.ingredients;
  const tableauFiltreAppareils = allFilterSelected.appareils;
  const tableauFiltreUstensiles = allFilterSelected.ustensiles;

  // Suppression du tag dans le tableau correspondant entre ingrédients, appareils et ustensiles
  if (monTag.classList.contains("ingredient")) {
    //Suppression du filtre avec l'index de l'élément (.trim => supprimer les espaces)
    tableauFiltreIngredients.splice(
      tableauFiltreIngredients.indexOf(contentTag.trim()),
      1
    );
  }

  if (monTag.classList.contains("appareil")) {
    tableauFiltreAppareils.splice(
      tableauFiltreAppareils.indexOf(contentTag.trim()),
      1
    );
  }

  if (monTag.classList.contains("ustensile")) {
    tableauFiltreUstensiles.splice(
      tableauFiltreUstensiles.indexOf(contentTag.trim()),
      1
    );
  }
  rechercheDeRecetteAfterDelete();
  //Suppression sur le DOM
  monTag.remove();
}
