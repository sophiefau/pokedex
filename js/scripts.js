let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

   function getAll() {
    return pokemonList;
  }

  function loadList() {    
    return $.getJSON(apiUrl).then(function (json) {
      console.log(json.results); // Check in console log if data are loading
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return $.getJSON(url).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default; 
      pokemon.types = details.types.map(type => type.type.name); // Extract the names of types
      pokemon.height = details.height;

      console.log(pokemon);
      showModal(pokemon);
      return pokemon;

    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon.name, pokemon.imageUrl, pokemon.types, pokemon.height);
    });
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    console.log(pokemon);

    let pokemonUl = $('.pokemon-list');
    let pokemonLi = $('<li></li>');
    let button = $('<button></button>')
                .attr('data-toggle', 'modal')
                .attr('data-target', '#modal-container')
                .addClass('button button-class btn btn-primary')
                .text(pokemon.name);
                
    button.on('click', function (event) {
      event.preventDefault();
      showDetails(pokemon);
    });
    
    pokemonLi.append(button);
    pokemonUl.append(pokemonLi);
  }

  function showModal(name, image, types, height) {
    let modal = $('.modal-content');

    let nameElement = $('<h1></h1>').addClass('h1').text(name);
    modal.append(nameElement);

    let modalImage = $('<div></div>').addClass('pokemon-img');
    let imgElement = $('<img>').attr('src', image).attr('alt', 'Pokemon Image');
    modalImage.append(imgElement);
    modal.append(modalImage);

    let modalText = $('<div></div>').addClass('pokemon-text');
    let typeP = $('<p></p>').text(types);
    let heightP = $('<p></p>').text(height);
    modalText.append(typeP).append(heightP);
    modal.append(modalText);

    modalContainer.append(modal);
  }

  function hideModal() {
    modalContainer.removeClass('is-visible');
  }

  $(window).on('keydown', function (e) {
    if (e.key === 'Escape' && modalContainer.hasClass('is-visible')) {
      hideModal();
    }
  });

  modalContainer.on('click', function (e) {
    if ($(e.target).is(modalContainer)) {
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
  console.log(pokemonRepository.getAll()); // Check if the list is populated
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



// let pokemonRepository = (function () {

//   let pokemonList = [];
//   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
//   let modalContainer = document.querySelector('#modal-container');

//   function add(pokemon) {
//     pokemonList.push(pokemon);
//   }

//    function getAll() {
//     return pokemonList;
//   }
    
//   function addListItem(pokemon) {
//     let pokemonUl = document.querySelector('.pokemon-list');
//     let pokemonLi = document.createElement('li');
//     let button = document.createElement('button');
//     button.innerText = pokemon.name;
//     button.classList.add('button-class');
//     button.addEventListener('click', function () {
//       showDetails(pokemon);
//     });
    
//     pokemonLi.appendChild(button);
//     pokemonUl.appendChild(pokemonLi);
//   }

//   function loadList() {
//     return fetch(apiUrl).then(function (response) {
//       return response.json();
//     })
//     .then(function (json) {
//       json.results.forEach(function (item) {
//         let pokemon = {
//           name: item.name,
//           detailsUrl: item.url
//         };
//         add(pokemon);
//       });
//     }).catch(function (e) {
//       console.error(e);
//     })
//   }

//   function loadDetails(item) {
//     let url = item.detailsUrl;
//     return fetch(url).then(function (response) {
//       return response.json();
//     }).then(function (details) {
//       // Add the details to the item
//       item.imageUrl = details.sprites.front_default; 
//       // || 'path/to/placeholder.png';
//       item.types = details.types.map(type => type.type.name); // Extract the names of types
//       item.height = details.height;
//     }).catch(function (e) {
//       console.error(e);
//     });
//   }

//   function showDetails(pokemon) {
//     return loadDetails(pokemon).then(function() {
//         showModal(
//           pokemon.name,
//           'Type: ' + pokemon.types ,
//           'Height: ' + pokemon.height,
//           pokemon.imageUrl
//       );
//       console.log(pokemon);
//     });
//   }

//   function showModal(title, text, image) {
    
//     modalContainer.innerHTML = '';
//     modalContainer.classList.add('is-visible');

//     let modal = document.createElement('div');
//     modal.classList.add('modal');

//     let closeButtonElement = document.createElement('button');
//     closeButtonElement.classList.add('modal-close');
//     closeButtonElement.innerText = 'Close';
//     closeButtonElement.addEventListener('click', hideModal);
//     modal.appendChild(closeButtonElement);

//     let titleElement = document.createElement('h1');
//     titleElement.innerText = title;
//     modal.appendChild(titleElement);

//     let modalContent = document.createElement('div');
//     modalContent.classList.add('modal-content');

//     let modalImage = document.createElement('div');
//     modalImage.classList.add('pokemon-img');

//     let imgElement = document.createElement('img');
//     imgElement.src = image;
//     imgElement.alt = "Pokemon Image";

//     modalImage.appendChild(imgElement);
//     modalContent.appendChild(modalImage);

//     let modalText = document.createElement('div');
//     modalText.classList.add('pokemon-text');

//     let p = document.createElement('p');
//     p.textContent = text;

//     modalText.appendChild(p);
//     modalContent.appendChild(modalText);

//     modal.appendChild(modalContent);

//     modalContainer.appendChild(modal);
//   }

//   function hideModal() {
//     modalContainer.classList.remove('is-visible');
//   }

//   window.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//       hideModal();
//     }
//   });

//   modalContainer.addEventListener('click', (e) => {
//     // close if the user clicks directly on the overlay
//     let target = e.target;
//     if (target === modalContainer) {
//       hideModal();
//     }
//   });

//   return {
//     add: add,
//     getAll: getAll,
//     addListItem: addListItem,
//     loadList: loadList,
//     loadDetails: loadDetails,
//     showDetails: showDetails
//   };
// })();
    
// pokemonRepository.loadList().then(function() {
//   pokemonRepository.getAll().forEach(function(pokemon){
//     pokemonRepository.addListItem(pokemon);
//   });
// });
