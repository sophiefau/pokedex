//IIFE for pokemonRepository
let pokemonRepository = (function () {

  //Pokemom list array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';

  // Function to add new pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //Function to get all pokemon
   function getAll() {
    return pokemonList;
  }

  //Function to load the list of pokemon from the API
  function loadList() {    
    return $.getJSON(apiUrl).then(function (json) {
      console.log(json.results); // Check in console log if data are loading
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Function to load details of each pokemon
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Add the details to the item
      pokemon.imageUrlFront = details.sprites.front_default; 
      pokemon.imageUrlBack = details.sprites.back_default; 
      pokemon.types = details.types.map(type => type.type.name); // Extract the names of types
      pokemon.abilities = details.abilities.map(abilityInfo => abilityInfo.ability.name); // Extract abilities
      pokemon.height = details.height;
      pokemon.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Function to add list item to the DOM
  function addListItem(pokemon) {
    console.log('Image URL front:', pokemon.imageUrlFront);
    let pokemonUl = $('.pokemon-list');
    let pokemonLi = $('<li></li>').addClass('col-lg-3 col-md-4 col-sm-6 mb-4');  // Add Bootstrap grid classes
    let button = $('<button></button>')
                .attr('data-toggle', 'modal')
                .attr('data-target', '#exampleModal')
                .addClass('button-class');
                
    let imgElement = $('<img>')
                .attr('src', pokemon.imageUrlFront) // Set the image URL
                // .attr('alt', pokemon.name)     // Set the alt attribute to the Pokémon's name
                .addClass('img-button'); 

    button.append(imgElement); // Append image to the button

    let nameElement = $('<span></span>').text(pokemon.name); // Create a span for the name text
    button.append(nameElement); // Append name to the button

    button.on('click', function (event) {
      event.preventDefault();
      showDetails(pokemon);
    });
    
    // Append button and li
    pokemonLi.append(button);
    pokemonUl.append(pokemonLi);
  }

  //Function to show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
        console.log(pokemon);
    });
}
    
  function showModal(pokemon) {
    let modal = $('.modal-content');
    modal.empty(); // Clear the existing content

    let modalTitle = $('.modal-title');
    modalTitle.text(pokemon.name);
    modal.append(modalTitle);

    let modalBody = $('.modal-body');

    let imgElementFront = $('<img>').attr('src', pokemon.imageUrlFront).attr('alt', 'Pokemon Image Front');
    let imgElementBack = $('<img>').attr('src', pokemon.imageUrlBack).attr('alt', 'Pokemon Image Back');
    modalBody.append(imgElementFront);
    modalBody.append(imgElementBack);

    let modalText = $('<div></div>').addClass('pokemon-text');
    let typeP = $('<p></p>').text('Types: ' + pokemon.types.join(', '));
    let abilitiesP = $('<p></p>').text('Abilities: ' + pokemon.abilities.join(', '));
    let heightP = $('<p></p>').text('Height: ' + pokemon.height);
    let weightP = $('<p></p>').text('Weight: ' + pokemon.weight);
    modalText.append(typeP).append(abilitiesP).append(heightP).append(weightP);
    modal.append(modalText);

    modalBody.append(modal);
  }

  // function hideModal() {
  //   modalContainer.removeClass('is-visible');
  // }

  // $(window).on('keydown', function (e) {
  //   if (e.key === 'Escape' && modalContainer.hasClass('is-visible')) {
  //     hideModal();
  //   }
  // });

  // modalContainer.on('click', function (e) {
  //   if ($(e.target).is(modalContainer)) {
  //     hideModal();
  //   }
  // });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


//Get all pokemon from the list
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
