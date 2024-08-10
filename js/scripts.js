let pokemonList = [
  {name: 'Pikachu', height: 0.4, type: 'Electric'},
  {name: 'Charmander', height: 0.6, type: 'Fire'},
  {name: 'Vulpix', height: 0.6, type: 'Fire'},
  {name: 'Meowth', height: 0.4, type: 'Normal'},
  {name: 'Snorlax', height: 2.1, type: 'Normal'},
  {name: 'Foongus', height: 0.2, type: ['Grass','Poison',]},
  {name: 'Purrloin', height: 0.4, type: 'Dark'}
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write (`${pokemonList[i].name} (height: ${pokemonList[i].height}m)<br>`)
  if (pokemonList[i].height >1.5){document.write("This is a huge Pokémon!!<br>")}
};


/* else if (pokemonList[i].height <0.5 && pokemonList[i].height >1.5){
  document.write("Oh that's an average Pokémon.");}
else {
  document.write("This Pokémon is tiny...")} */
