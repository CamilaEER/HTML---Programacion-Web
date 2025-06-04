// 5
// Función para determinar si una palabra o frase es un palíndromo
function esPalindromo(palabra) {
  // Limpiar la palabra: convertir a minúsculas y eliminar caracteres no alfanuméricos
  const limpia = palabra.toLowerCase().replace(/[^a-z0-9]/g, '');
  // Invertir la cadena limpia
  const invertida = limpia.split('').reverse().join('');
  // Comparar la cadena limpia con su versión invertida
  return limpia === invertida;
}

// Prueba con frase que es palíndromo
console.log(esPalindromo("Anita lava la tina")); // true

