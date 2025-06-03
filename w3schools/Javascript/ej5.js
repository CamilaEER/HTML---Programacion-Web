// Determinar si una palabra es palíndromo
function esPalindromo(palabra) {
  const limpia = palabra.toLowerCase().replace(/[^a-z0-9]/g, '');
  const invertida = limpia.split('').reverse().join('');
  return limpia === invertida;
}

console.log(esPalindromo("Anita lava la tina")); // true
