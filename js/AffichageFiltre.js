// Affiche les ingrédients dans le menu déroulant 'ingrédients'
function affichageIngredientDesFiltres(lesRecettes) {
  const ulIngredient = document.querySelector(".ul-ingredients");

  //Remet à 0 toute ma liste d'ingrédient
  if (ulIngredient) {
    ulIngredient.remove();
  }

  //Création de l'ul
  const monUl = document.createElement("ul");
  monUl.setAttribute("class", "ul-ingredients");
  SearchBarIngredients.appendChild(monUl);

  //Si le tableau des ingrédients contient quelquechose alors je supprime
  if (mySetOfIngredients.size > 0) {
    mySetOfIngredients.clear();
  }
  lesRecettes.forEach((recette) => {
    const mesIngredients = recette.ingredients;
    mesIngredients.forEach((ingre) => {
      const unIngredient = ingre.ingredient.toLowerCase();
      // Je vérifie si l'ingrédient n'est pas déja présent dans les filtres séléctionnés
      if (!allFilterSelected.ingredients.includes(unIngredient)) {
        //set.add permet d'éviter les doublons
        mySetOfIngredients.add(unIngredient.toLowerCase());
      }
    });
  });

  mySetOfIngredients.forEach((e) => {
    const itemIngredient = document.createElement("li");

    itemIngredient.setAttribute("class", "li-ingredient");
    itemIngredient.innerHTML = `${e}`;

    monUl.appendChild(itemIngredient);
    itemIngredient.addEventListener("click", function(event){
      ajoutFiltre(event, 'ingredients');
    });
  });
}

// Affiche les appareils dans le menu déroulant 'appareils'
function affichageAppareilsDesFiltres(lesRecettes) {
  const ulAppareils = document.querySelector(".ul-appareils");

  //Remet à 0 toute ma liste d'appareils
  if (ulAppareils) {
    ulAppareils.remove();
  }

  //Création de l'ul
  const monUl = document.createElement("ul");
  monUl.setAttribute("class", "ul-appareils");

  SearchBarAppareils.appendChild(monUl);

  //Si le tableau des apparareils contient quelquechose alors je supprime
  if (mySetOfAppareils.size > 0) {
    mySetOfAppareils.clear();
  }

  lesRecettes.forEach((recette) => {
    const monAppareil = recette.appliance.toLowerCase();
    // Je vérifie si l'appareil n'est pas déja présent dans les filtres séléctionnés
    if (!allFilterSelected.appareils.includes(monAppareil)) {
      //set.add permet d'éviter les doublons
      mySetOfAppareils.add(monAppareil);
    }
  });

  mySetOfAppareils.forEach((e) => {
    const itemIngredient = document.createElement("li");

    itemIngredient.setAttribute("class", "li-appareils");
    itemIngredient.innerHTML = `${e}`;

    monUl.appendChild(itemIngredient);
    itemIngredient.addEventListener("click", function(event){
      ajoutFiltre(event, 'appareils');
    });
  });
}

// Affiche les ustensiles dans le menu déroulant 'ustensiles'
function affichageUstensilesDesFiltres(lesRecettes) {
  const ulUstensiles = document.querySelector(".ul-ustensiles");

  //Remet à 0 toute ma liste d'ustensiles
  if (ulUstensiles) {
    ulUstensiles.remove();
  }

  //Création de l'ul
  const monUl = document.createElement("ul");
  monUl.setAttribute("class", "ul-ustensiles");

  SearchBarUstensiles.appendChild(monUl);

  //Si le tableau des ustensiles contient quelquechose alors je supprime
  if (mySetOfUstensiles.size > 0) {
    mySetOfUstensiles.clear();
  }

  lesRecettes.forEach((recette) => {
    const mesUstensiles = recette.ustensils;
    mesUstensiles.forEach((ustensile) => {
      // Je vérifie si l'appareil n'est pas déja présent dans les filtres séléctionnés
      if (!allFilterSelected.ustensiles.includes(ustensile.toLowerCase())) {
        //set.add permet d'éviter les doublons
        mySetOfUstensiles.add(ustensile.trim().toLowerCase());
      }
    });
  });

  mySetOfUstensiles.forEach((e) => {
    const itemIngredient = document.createElement("li");

    itemIngredient.setAttribute("class", "li-ustensiles");
    itemIngredient.innerHTML = `${e}`;

    monUl.appendChild(itemIngredient);
    itemIngredient.addEventListener("click", function(event){
      ajoutFiltre(event, 'ustensiles');
    });
  });
}

// Ajout des événements clavier pour la barre de recherche des filtres
SearchBarIngredients.firstElementChild.addEventListener(
  "keyup",
  rechercheIngredients
);

SearchBarAppareils.firstElementChild.addEventListener(
  "keyup",
  rechercheAppareils
);

SearchBarUstensiles.firstElementChild.addEventListener(
  "keyup",
  rechercheUstensiles
);


// Filtrage avec la barre de recherche des filtres (ingrédients, appareils, ustensiles)

// Barre de recherche du filtre Ingrédients
function rechercheIngredients(search) {
  const tableauIngredient = [...mySetOfIngredients];
  const monUl = document.querySelector(".ul-ingredients");
  //vide l'anciennce liste
  monUl.innerHTML = "";

  tableauIngredient.forEach((e) => {
    const elementTrouve =
      JSON.stringify(e)
        .toLowerCase()
        .indexOf(search.target.value.toLowerCase()) >= 0;

    if (elementTrouve) {
      const itemIngredient = document.createElement("li");

      itemIngredient.setAttribute("class", "li-ingredient");
      itemIngredient.innerHTML = `${e}`;

      monUl.appendChild(itemIngredient);
      itemIngredient.addEventListener("click", function(event){
        ajoutFiltre(event, 'ingredients');
      });
    }
  });
}

// Barre de recherche du filtre Appareils
function rechercheAppareils(search) {
  const tableauAppareils = [...mySetOfAppareils];
  const monUl = document.querySelector(".ul-appareils");
  //vide l'anciennce liste
  monUl.innerHTML = "";

  tableauAppareils.forEach((e) => {
    const elementTrouve =
      JSON.stringify(e)
        .toLowerCase()
        .indexOf(search.target.value.toLowerCase()) >= 0;

    if (elementTrouve) {
      const itemIngredient = document.createElement("li");

      itemIngredient.setAttribute("class", "li-appareils");
      itemIngredient.innerHTML = `${e}`;

      monUl.appendChild(itemIngredient);
      itemIngredient.addEventListener("click", function(event){
        ajoutFiltre(event, 'appareils');
      });
    }
  });
}

// Barre de recherche du filtre Ustensiles
function rechercheUstensiles(search) {
  const tableauUstensiles = [...mySetOfUstensiles];
  const monUl = document.querySelector(".ul-ustensiles");
  //vide l'anciennce liste
  monUl.innerHTML = "";

  tableauUstensiles.forEach((e) => {
    const elementTrouve =
      JSON.stringify(e)
        .toLowerCase()
        .indexOf(search.target.value.toLowerCase()) >= 0;

    if (elementTrouve) {
      const itemIngredient = document.createElement("li");

      itemIngredient.setAttribute("class", "li-ustensiles");
      itemIngredient.innerHTML = `${e}`;

      monUl.appendChild(itemIngredient);
      itemIngredient.addEventListener("click", function(event){
        ajoutFiltre(event, 'ustensiles');
      });
    }
  });
}
