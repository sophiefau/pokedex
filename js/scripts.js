let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

   function getAll() {
    return pokemonList;
  }
    
  function addListItem(pokemon) {
    let pokemonUl = document.querySelector('.pokemon-list');
    let pokemonLi = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    
    pokemonLi.appendChild(button);
    pokemonUl.appendChild(pokemonLi);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Add the details to the item
      item.imageUrlFront = details.sprites.front_default; 
      item.imageUrlBack = details.sprites.back_default;       // || 'path/to/placeholder.png';
      item.types = details.types.map(type => type.type.name); // Extract the names of types
      item.abilities = details.abilities.map(abilityInfo => abilityInfo.ability.name); // Extract the abilities
      item.height = details.height;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

    function showDetails(pokemon) {
    return loadDetails(pokemon).then(function() {
        showModal(
        pokemon.name,
        pokemon.imageUrlFront,
        pokemon.imageUrlBack,
        'Type: ' + pokemon.types.join(', '),
        'Abilities: ' + pokemon.abilities.join(', '),
        'Height: ' + pokemon.height + ' dm',
        'Weight: ' + pokemon.weight + ' hg',
      );
      console.log(pokemon);
    });
  }

  function showModal(title, imageFront, imageBack, types, abilities, height, weight, forms) {
    
    modalContainer.innerHTML = '';
    modalContainer.classList.add('is-visible');

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    modal.appendChild(closeButtonElement);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    modal.appendChild(titleElement);

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    let divImage = document.createElement('div');
    divImage.classList.add('pokemon-img');

    let imgElementFront = document.createElement('img');
    imgElementFront.src = imageFront;
    imgElementFront.alt = "Pokemon Image Front";

    let imgElementBack = document.createElement('img');
    imgElementBack.src = imageBack;
    imgElementBack.alt = "Pokemon Image Back";

    divImage.appendChild(imgElementFront);
    divImage.appendChild(imgElementBack);
    modalContent.appendChild(divImage);

    let modalText = document.createElement('div');
    modalText.classList.add('pokemon-text');

    let p1 = document.createElement('p');
    p1.textContent = types;

    let p2 = document.createElement('p');
    p2.textContent = abilities;

    let p3 = document.createElement('p');
    p3.textContent = height;

    let p4 = document.createElement('p');
    p4.textContent = weight;

    let p5 = document.createElement('p');
    p5.textContent = forms;

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
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
    
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
