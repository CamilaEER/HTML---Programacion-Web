// 1
// Función para invertir una cadena de texto
function invertirCadena(cadena) {
  // Convertir la cadena en un arreglo de caracteres, invertir el arreglo y unirlo de nuevo
  return cadena.split("").reverse().join("");
}

// Ejemplo de uso e impresión del resultado
console.log(invertirCadena("Hola Mundo")); // "odnuM aloH"
