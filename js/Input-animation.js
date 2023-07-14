filterTagIngredients.addEventListener("click", changeStateTags);
filterTagAppareils.addEventListener("click", changeStateTags);
filterTagUstensiles.addEventListener("click", changeStateTags);


function changeStateTags(e) {
    if (e.target.nextElementSibling.classList.contains('hide')) {
      e.target.style.setProperty('--deg', '180deg');
      e.target.nextElementSibling.classList.remove("hide");
    } else {
      e.target.style.setProperty('--deg', '0deg');
      e.target.nextElementSibling.classList.add("hide");
    }
  };