let names = ['Nancy', 'Blessing', 'Jorge', 'Svetlana', 'Bob'];

const namesB = names.filter((name) => name.split('')[0] == 'B');
console.log(namesB);

const namesLength = names.map((name) => name.length)
console.log(namesLength);

console.log(names.reduce((sum, name) => sum + name.length, 0) / names.length)
