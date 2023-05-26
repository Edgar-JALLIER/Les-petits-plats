const template = document.querySelector("#mon-template");
const sectionRecette = document.querySelector(".ma-section-recette");
const searchBar = document.getElementById("search");

let tableauDesRecettes = [];

// Fonction de récupération de la data des recettes
async function getRecettes() {
  try {
    const response = await fetch("../../data/data-recettes.json");
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

  recettes.forEach((recette) => {
    const maRecette = document.createElement("div");
    maRecette.setAttribute("class", "recette-card");
    maRecette.innerHTML = `
        <div class="recette-card">
        <div class="recette-card__image"><img class="recette-card__photo" src='../assets/photos-recettes/Recette${recette.id}.jpg' alt="" /></div>
        <div class="recette-card__text-container">
          <div class="recette-card__title-time">
          <h2 class="recette-card__title">${recette.name}</h2>
          <div class="recette-card__div-time">
            <i class="fa-regular fa-clock"></i>
            <p class="recette-card__p-time">${recette.time} min</p>
          </div>
        </div>
          <div class="recette-card__ingredients-instruction">
            <ul class="recette-card__ingredient-list" id="${recette.id}">
            </ul>
            <p class="recette-card__description">${recette.description}</p>
          </div>
        </div>
      </div>`;

    createContainer.appendChild(maRecette);
    sectionRecette.appendChild(createContainer);
    affichageIngredient(recette);
  });
}

//Fonction pour afficher une liste de tous les ingrédients d'une recette (l'ingrédient, la quantité, l'unité de mesure)
function affichageIngredient(uneRecette) {
  uneRecette.ingredients.forEach((e) => {
    const maListe = document.getElementById(`${uneRecette.id}`);
    const mesIngredients = document.createElement("li");
    const monIngredient = document.createElement("span");
    const spanQuantity = document.createElement("span");
    const spanUnit = document.createElement("span");
    const maQuantity = e.quantity ? e.quantity : undefined;
    const monUnit = e.unit ? e.unit : undefined;

    mesIngredients.setAttribute("class", "recette-card__ingredient-item");
    monIngredient.setAttribute("class", "recette-card__ingredient-item-bold");
    monIngredient.innerHTML = `${e.ingredient}`;

    if (maQuantity != undefined) {
      spanQuantity.innerHTML = `: ${maQuantity}`;
    }
    if (monUnit != undefined) {
      spanUnit.innerHTML = ` ${monUnit}`;
    }

    mesIngredients.appendChild(monIngredient);
    mesIngredients.appendChild(spanQuantity);
    mesIngredients.appendChild(spanUnit);
    maListe.appendChild(mesIngredients);
  });
}

// Fonction qui permet d'initialiser les fonctions
async function init() {
  const mesRecettes = await getRecettes();
  await createRecetteDom(mesRecettes);
}

init();

searchBar.addEventListener("keyup", (e) => {
  if (searchBar.value.length >= 3) {
    rechercheDeRecette(tableauDesRecettes);
  } else {
    createRecetteDom(tableauDesRecettes);
  }
});

function rechercheDeRecette(tableau) {
  let newTableau = [];
  tableau.filter((e) => {
    const elementTrouve = JSON.stringify(e).indexOf(searchBar.value) >= 0;
    if (elementTrouve === true) {
      newTableau.push(e);
    }
  });
  if (newTableau.length <= 0) {
    const monContainer = document.querySelector(".all-recette-container");
    if (monContainer) {
      monContainer.remove();
    }
    //alert(`Pas de recette disponible avec le mot clé "${searchBar.value}"`);
  } else {
    return createRecetteDom(newTableau);
  }
}
