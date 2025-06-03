// Verificar si un número es primo
function esPrimo(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log(esPrimo(7)); // true
console.log(esPrimo(10)); // false
