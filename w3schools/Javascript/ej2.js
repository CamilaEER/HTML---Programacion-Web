// 2
// Función para contar cuántas vocales hay en una cadena
function contarVocales(cadena) {
  // Buscar coincidencias con vocales (mayúsculas y minúsculas) usando expresión regular
  const coincidencias = cadena.match(/[aeiou]/gi);
  // Retornar la cantidad de coincidencias o 0 si no hay ninguna
  return coincidencias ? coincidencias.length : 0;
}

// Prueba con la cadena "Hola Mundo"
console.log(contarVocales("Hola Mundo")); // 4

