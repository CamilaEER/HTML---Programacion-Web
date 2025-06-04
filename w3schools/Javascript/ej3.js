// 3
// Función para verificar si un número es primo
function esPrimo(num) {
  if (num <= 1) return false; // Los números menores o iguales a 1 no son primos

  // Revisar todos los números desde 2 hasta num-1
  for (let i = 2; i < num; i++) {
    // Si num es divisible por alguno, no es primo
    if (num % i === 0) return false;
  }
  // Si no encontró divisores, es primo
  return true;
}

// Ejemplos de uso
console.log(esPrimo(7));  // true
console.log(esPrimo(10)); // false

