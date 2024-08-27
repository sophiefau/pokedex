let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
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

  function loadDetails(pokemon) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Add the details to the item
      item.imageUrl = details.sprites.front_default; 
      // || 'path/to/placeholder.png';
      pokemon.types = details.types.map(type => type.type.name); // Extract the names of types
      pokemon.height = details.height;
      pokemon.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    return loadDetails(pokemon).then(function() {
        showModal(
          pokemon.name,
        'Type: ' + pokemon.types,
        'Height: ' + pokemon.height,
        pokemon.imageUrl
      );
      console.log(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();
    
    // modalContainer.innerHTML = '';
    // modalContainer.classList.add('is-visible');

    // let modal = document.createElement('div');
    // modal.classList.add('modal');

    // let closeButtonElement = document.createElement('button');
    // closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = 'Close';
    // closeButtonElement.addEventListener('click', hideModal);
    // modal.appendChild(closeButtonElement);

    let titleElement = $('<h1>'+ pokemon.name +'</h1>');

    // let modalContent = document.createElement('div');
    // modalContent.classList.add('modal-content');

    // let modalImage = document.createElement('div');
    // modalImage.classList.add('pokemon-img');

    let imgElement = $('<img class="modal-img">');
    imgElement.attr('src', item.imageUrlFront, alt = "Pokemon Image");

    // modalImage.appendChild(imgElement);
    // modalContent.appendChild(modalImage);

    let modalText = document.createElement('div');
    modalText.classList.add('pokemon-text');

    let heightElement = $('<p>' + "height: " + pokemon.height + '</p>');
    let weightElement = $('<p>' + "weight: " + pokemon.weight + '</p>');



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
