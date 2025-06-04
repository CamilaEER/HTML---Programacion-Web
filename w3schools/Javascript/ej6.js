// 6
// Función para encontrar el número más grande en un arreglo
function numeroMayor(arr) {
  // Usamos Math.max con el spread operator para pasar los elementos como argumentos
  return Math.max(...arr);
}

// Ejemplo de arreglo con números
console.log(numeroMayor([3, 7, 2, 99, 4])); // 99

