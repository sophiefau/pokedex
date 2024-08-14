let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: 'Electric'},
    {name: 'Charmander', height: 0.6, type: 'Fire'},
    {name: 'Vulpix', height: 0.6, type: 'Fire'},
    {name: 'Meowth', height: 0.4, type: 'Normal'},
    {name: 'Snorlax', height: 2.1, type: 'Normal'},
    {name: 'Foongus', height: 0.2, type: ['Grass',' Poison',]},
    {name: 'Purrloin', height: 0.4, type: 'Dark'}
  ];


  pokemonList.forEach (function(pokemonList) {
    document.write("<p>" + pokemonList.name + " (height:" + pokemonList.height + "m) - Type: "+ pokemonList.type);
    if (pokemonList.height >1.5){document.write(" This is a huge Pokémon!!" + "</p>")}
  });
  



// let pokemonRepository = (function () {
// })();


  /* function printArrayDetails(){
    for (let i = 0; i < pokemonList.length; i++) {
      /* document.write (`${pokemonList[i].name} (height: ${pokemonList[i].height}m)`) */
  /*     document.write("<p>" + pokemonList[i].name + "(height:" + pokemonList[i].height + "m )");
      if (pokemonList[i].height >1.5){document.write(" This is a huge Pokémon!!" + "</p>")}
    }
  };
  
  printArrayDetails(); */

  // function add(pokemon) {
  //   pokemonList.push(pokemon);
  // }

  // function getAll() {
  //   return pokemonList;
  // }

  // return {
  //   add: add,
  //   getAll: getAll
  // };


// console.log(pokemonRepository.getAll()); // []
// pokemonRepository.add({ name: 'Pikachu' });
// console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]





/* else if (pokemonList[i].height <0.5 && pokemonList[i].height >1.5){
  document.write("Oh that's an average Pokémon.");}
else {
  document.write("This Pokémon is tiny...")} */


