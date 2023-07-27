let arrayRecetteAfterFilter = new Object(tableauDesRecettes);

let arrayRecetteAfterSearch =
  searchBar.value === "" ? new Object(tableauDesRecettes) : [];

// Ecoute de l'input de la barre de recherche
searchBar.addEventListener("keyup", async (e) => {
  await rechercheDeRecette(tableauDesRecettes);
});

async function rechercheDeRecette(tableau) {
  // Je vide le tableau de la Searchbar
  arrayRecetteAfterSearch = [];
  // Je filtre mes recettes dans le tableau de toutes les recettes avec la valeur de la barre de recherche
  arrayRecetteAfterSearch = tableau.filter((e) => {
    return (
      JSON.stringify(e).toLowerCase().indexOf(searchBar.value.toLowerCase()) >=
      0
    );
  });
  // Je vais filtrer mon tableau de la barre de recherche avec les filtres séléctionnés s'il y en a
  rechercheDeRecetteAfterDelete();

  // Ajout d'un message d'erreur si aucune recette n'est trouvé
  if (arrayRecetteAfterSearch.length <= 0) {
    errorMessage.textContent = "Désolé aucune recette trouvée contenant :" + ` ${searchBar.value.toLowerCase()}`;
  } else {
    errorMessage.textContent = "";
  }
}

// Fonction pour trier les recettes lors de l'ajout d'un nouveau filtre 'Ingrédients'
async function rechercheDeRecetteParTagIngredient() {
  /* 
  Vérification du tableau à filtrer : 
  Si il n'y a pas de valeur dans le champ de recherche alors :
  Je prend le tableau de filtre (initialisé avec toutes les recettes) 
  Sinon je prend le tableau de la searchBar comme base
  Mais si il y a au moins 1 filtre alors je me base sur le tableau de filtre en priorité
  */
  let tableauAFiltrer;
  
  if (searchBar.value === "") {
    tableauAFiltrer = arrayRecetteAfterFilter;
  } else {
    tableauAFiltrer = arrayRecetteAfterSearch;
    if (
      !Object.values(allFilterSelected).every((array) => array.length === 0)
    ) {
      tableauAFiltrer = arrayRecetteAfterFilter;
    }
  }

  // Je filtre le tableau en passant par tous les filtres des 'ingrédients'
  arrayRecetteAfterFilter = tableauAFiltrer.filter((e) => {
    // Verifie si tous les filtres 'ingrédients' séléctionnés sont présents dans les ingrédients de chaque recette
    return allFilterSelected.ingredients.every((tag) => {
      return e.ingredients.some(
        (i) => i.ingredient.trim().toLowerCase() === tag
      );
    });
  });
  // Reconstruction du DOM avec le bon tableau de recette
  await createRecetteDom(arrayRecetteAfterFilter);
}

// Fonction pour trier les recettes lors de l'ajout d'un nouveau filtre 'Appareils'
async function rechercheDeRecetteParTagAppareil() {
  let tableauAFiltrer;

  if (searchBar.value === "") {
    tableauAFiltrer = arrayRecetteAfterFilter;
  } else {
    tableauAFiltrer = arrayRecetteAfterSearch;
    if (
      !Object.values(allFilterSelected).every((array) => array.length === 0)
    ) {
      tableauAFiltrer = arrayRecetteAfterFilter;
    }
  }
  
  arrayRecetteAfterFilter = tableauAFiltrer.filter((e) => {
    return allFilterSelected.appareils.every((tag) => {
      return e.appliance.trim().toLowerCase().includes(tag);
    });
  });

  await createRecetteDom(arrayRecetteAfterFilter);
}

// Fonction pour trier les recettes lors de l'ajout d'un nouveau filtre 'Ustensiles'
async function rechercheDeRecetteParTagUstensile() {
  let tableauAFiltrer;

  if (searchBar.value === "") {
    tableauAFiltrer = arrayRecetteAfterFilter;
  } else {
    tableauAFiltrer = arrayRecetteAfterSearch;
    if (
      !Object.values(allFilterSelected).every((array) => array.length === 0)
    ) {
      tableauAFiltrer = arrayRecetteAfterFilter;
    }
  }

  arrayRecetteAfterFilter = tableauAFiltrer.filter((e) => {
    // Verification si tous les ingrédients dans les tags sont présents dans les ingrédients de chaque recette
    return allFilterSelected.ustensiles.every((tag) => {
      return e.ustensils.some(
        (i) => i.trim().toLowerCase() === tag.toLowerCase()
      );
    });
  });
  await createRecetteDom(arrayRecetteAfterFilter);
}

async function rechercheDeRecetteAfterDelete() {
  // J'initialise un tableau à filtrer sur lequel je lui assigne le tableau filtré en fonction de la barre de recherche
  let tableauAFiltrer = arrayRecetteAfterSearch;

  if (allFilterSelected.ingredients.length > 0) {
    tableauAFiltrer = tableauAFiltrer.filter((e) => {
      // Verification si tous les ingrédients dans les tags sont présents dans les ingrédients de chaque recette
      return allFilterSelected.ingredients.every((tag) => {
        return e.ingredients.some(
          (i) => i.ingredient.toLowerCase() === tag.toLowerCase()
        );
      });
    });
  }

  if (allFilterSelected.appareils.length > 0) {
    tableauAFiltrer = tableauAFiltrer.filter((e) => {
      return allFilterSelected.appareils.every((tag) => {
        return e.appliance.toLowerCase().includes(tag.toLowerCase());
      });
    });
  }

  if (allFilterSelected.ustensiles.length > 0) {
    tableauAFiltrer = tableauAFiltrer.filter((e) => {
      // Verification si tous les ingrédients dans les tags sont présents dans les ingrédients de chaque recette
      return allFilterSelected.ustensiles.every((tag) => {
        return e.ustensils.some(
          (i) => i.trim().toLowerCase() === tag.toLowerCase()
        );
      });
    });
  }

  arrayRecetteAfterFilter = tableauAFiltrer;
  // Si il n'y a plus de filtre séléctionné alors je renvoi le tableau de la searchBar filtré
  if (Object.values(allFilterSelected).every((array) => array.length === 0)) {
    // Je change la valeur de ArrayFilter pour lui assigné la valeur de ArraySearch puisqu'il n'y a plus de filtre
    arrayRecetteAfterFilter = arrayRecetteAfterSearch;
    await createRecetteDom(arrayRecetteAfterSearch);
  } else {
    await createRecetteDom(arrayRecetteAfterFilter);
  }
}
