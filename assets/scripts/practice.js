function initialName(name){
 return name.split(' ').map(fLetter => fLetter[0].toUpperCase()).join('.')
}

const Init = initialName('Julio lopez');

console.log(Init);