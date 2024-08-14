let pokemonRepository = (function () {


let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: 'Electric'},
    {name: 'Charmander', height: 0.6, type: 'Fire'},
    {name: 'Vulpix', height: 0.6, type: 'Fire'},
    {name: 'Meowth', height: 0.4, type: 'Normal'},
    {name: 'Snorlax', height: 2.1, type: 'Normal'},
    {name: 'Foongus', height: 0.2, type: ['Grass',' Poison',]},
    {name: 'Purrloin', height: 0.4, type: 'Dark'}
  ];
   
    function add(pokemon) {
    pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }
    
    return {
      add: add,
      getAll: getAll
    };
})();
    
    pokemonRepository.getAll().forEach(function(pokemon) {
    document.write("<p>" + pokemon.name + " (height:" + pokemon.height + "m - type: "+ pokemon.type + ")");
    if (pokemon.height > 1.5) {
        document.write (" Wow, this Pokémon is huge!" + "</p>")}
  });

