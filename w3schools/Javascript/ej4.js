// 4
// Función para sumar todos los números dentro de un arreglo
function sumarArray(arr) {
  // Usamos reduce para acumular la suma de todos los elementos, iniciando en 0
  return arr.reduce((suma, num) => suma + num, 0);
}

// Ejemplo con arreglo de números
console.log(sumarArray([1, 2, 3, 4, 5])); // 15

