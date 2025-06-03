// Contar vocales en una cadena
function contarVocales(cadena) {
  const coincidencias = cadena.match(/[aeiou]/gi);
  return coincidencias ? coincidencias.length : 0;
}

console.log(contarVocales("Hola Mundo")); // 4
