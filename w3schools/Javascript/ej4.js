// Suma de todos los números de un arreglo
function sumarArray(arr) {
  return arr.reduce((suma, num) => suma + num, 0);
}

console.log(sumarArray([1, 2, 3, 4, 5])); // 15
