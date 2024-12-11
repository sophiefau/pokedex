let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=300";
  let modalContainer = document.querySelector("#modal-container");
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function showLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-text");
    if (loadingMessage) {
      loadingMessage.style.display = "block";
    }
  }
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-text");
    if (loadingMessage) {
      loadingMessage.style.display = "none";
    }
  }
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = { name: item.name, detailsUrl: item.url };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.types = details.types.map((type) => type.type.name);
        item.abilities = details.abilities.map(
          (abilityInfo) => abilityInfo.ability.name
        );
        item.height = details.height;
        item.weight = details.weight;
        return loadFlavorText(item);
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  function loadFlavorText(item) {
    let speciesUrl = item.detailsUrl.replace("/pokemon/", "/pokemon-species/");
    return fetch(speciesUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        let englishFlavorText = details.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        item.flavorText = englishFlavorText
          ? englishFlavorText.flavor_text
          : "No flavor text available.";
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function filterPokemonList(query) {
    showLoadingMessage();
    const allPokemons = pokemonRepository.getAll();
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    const pokemonUl = document.querySelector(".pokemon-list");
    const noResultsMessage = document.querySelector("#no-results-message");
    pokemonUl.innerHTML = "";
    if (filteredPokemons.length > 0) {
      noResultsMessage.classList.add("hidden");
      filteredPokemons.forEach((pokemon) => {
        addListItem(pokemon);
      });
    } else {
      noResultsMessage.classList.remove("hidden");
    }
    hideLoadingMessage();
  }
  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    filterPokemonList(query);
  });
  const goButton = document.querySelector("#search-go");
  goButton.addEventListener("click", function () {
    const query = searchInput.value;
    filterPokemonList(query);
  });
  const clearButton = document.querySelector("#clear-search");
  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    filterPokemonList("");
    let footer = document.querySelector(".footer-text");
    footer.style.display = "none";
  });
  function filterByType(type) {
    showLoadingMessage();
    const allPokemons = pokemonRepository.getAll();
    let filteredPokemons = [];
    if (type === "all") {
      filteredPokemons = allPokemons;
    } else {
      filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.types.includes(type)
      );
    }
    const pokemonUl = document.querySelector(".pokemon-list");
    const noResultsMessage = document.querySelector("#no-results-message");
    pokemonUl.innerHTML = "";
    if (filteredPokemons.length > 0) {
      noResultsMessage.classList.add("hidden");
      filteredPokemons.forEach((pokemon) => {
        addListItem(pokemon);
      });
    } else {
      noResultsMessage.classList.remove("hidden");
    }
    hideLoadingMessage();
  }
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const type = this.getAttribute("data-type");
      document
        .querySelectorAll(".menu a")
        .forEach((a) => a.classList.remove("active"));
      this.classList.add("active");
      filterByType(type);
    });
  });
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelectorAll(".menu a")
        .forEach((el) => el.classList.remove("active"));
      link.classList.add("active");
    });
  });
  function addListItem(pokemon) {
    let pokemonUl = document.querySelector(".pokemon-list");
    let pokemonLi = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    loadDetails(pokemon)
      .then(function () {
        let buttonImg = document.createElement("img");
        buttonImg.src = pokemon.imageUrlFront;
        buttonImg.alt = pokemon.name;
        buttonImg.classList.add("button-img");
        button.appendChild(buttonImg);
        if (pokemon.types.length > 1) {
          let color1 = getTypeColor(pokemon.types[0]);
          let color2 = getTypeColor(pokemon.types[1]);
          button.style.background = `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`;
          button.style.color = getManualTextColor(pokemon.types[0]);
        } else {
          let backgroundColor = getTypeColor(pokemon.types[0]);
          button.style.backgroundColor = backgroundColor;
          button.style.color = getManualTextColor(pokemon.types[0]);
        }
        button.addEventListener("click", function () {
          showDetails(pokemon);
        });
        pokemonLi.appendChild(button);
        pokemonUl.appendChild(pokemonLi);
      })
      .catch(function (e) {
        console.error("Error loading Pokémon details:", e);
      });
  }
  function getTypeColor(type) {
    const typeColors = {
      normal: "#adb5a1",
      fire: "#EE8130",
      water: "#3c73c4",
      electric: "#f5c52e",
      grass: "#3ea063",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#a33cad",
      ground: "#d1aa4a",
      flying: "#8cbbe9",
      psychic: "#F95587",
      bug: "#89a830",
      rock: "#a4985c",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD",
    };
    return typeColors[type] || "grey";
  }
  function getManualTextColor(type) {
    const typeTextColorMap = {
      normal: "black",
      fire: "black",
      water: "white",
      electric: "black",
      grass: "white",
      ice: "black",
      fighting: "white",
      poison: "white",
      ground: "black",
      flying: "black",
      psychic: "black",
      bug: "black",
      rock: "black",
      ghost: "black",
      dragon: "white",
      dark: "white",
      steel: "black",
      fairy: "black",
    };
    return typeTextColorMap[type] || "black";
  }
  function showDetails(pokemon) {
    return loadDetails(pokemon).then(function () {
      let heightComment = "";
      let weightComment = "";
      if (pokemon.height >= 20) {
        heightComment = " (This Pokémon is huge!!)";
      }
      if (pokemon.weight >= 1000) {
        weightComment = " (Wow, that's heavy!)";
      }
      showModal(
        pokemon.name,
        pokemon.imageUrlFront,
        pokemon.imageUrlBack,
        `Type: ${pokemon.types.join(", ")}`,
        `Abilities: ${pokemon.abilities.join(", ")}`,
        `Height: ${pokemon.height} dm${heightComment}`,
        `Weight: ${pokemon.weight} hg${weightComment}`,
        `"${pokemon.flavorText}"`
      );
      console.log(pokemon);
    });
  }
  function showModal(
    title,
    imageFront,
    imageBack,
    types,
    abilities,
    height,
    weight,
    flavorText
  ) {
    modalContainer.innerHTML = "";
    modalContainer.classList.add("is-visible");
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);
    modal.appendChild(closeButtonElement);
    let titleElement = document.createElement("h1");
    titleElement.innerText = title;
    modal.appendChild(titleElement);
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    let divImage = document.createElement("div");
    divImage.classList.add("pokemon-img");
    let imgElementFront = document.createElement("img");
    imgElementFront.src = imageFront;
    imgElementFront.alt = "Pokemon Image Front";
    let imgElementBack = document.createElement("img");
    imgElementBack.src = imageBack;
    imgElementBack.alt = "Pokemon Image Back";
    divImage.appendChild(imgElementFront);
    divImage.appendChild(imgElementBack);
    modalContent.appendChild(divImage);
    let modalText = document.createElement("div");
    modalText.classList.add("pokemon-text");
    let p1 = document.createElement("p");
    p1.textContent = types;
    let p2 = document.createElement("p");
    p2.textContent = abilities;
    let p3 = document.createElement("p");
    p3.textContent = height;
    let p4 = document.createElement("p");
    p4.textContent = weight;
    let p5 = document.createElement("p");
    p5.textContent = flavorText;
    p5.classList.add("pokemon-about");
    modalText.appendChild(p1);
    modalText.appendChild(p2);
    modalText.appendChild(p3);
    modalText.appendChild(p4);
    modalText.appendChild(p5);
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);
    modalContainer.appendChild(modal);
  }
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  window.addEventListener("scroll", function () {
    const backToTopButton = document.getElementById("back-to-top");
    if (window.scrollY > 200) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });
  document
    .getElementById("back-to-top")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  const logo = document.querySelector("#logo");
  logo.addEventListener("click", function (event) {
    event.preventDefault();
    searchInput.value = "";
    filterPokemonList("");
  });
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
