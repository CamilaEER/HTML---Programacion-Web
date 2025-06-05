// src/data/cursos.js
const cursos = [
  {
    id: 1,
    titulo: 'Curso de React Básico',
    descripcion: 'Aprende los fundamentos de React.',
    contenido: [
      {
        titulo: '¿Qué es React?',
        descripcion: 'React es una librería de JavaScript para construir interfaces de usuario. Fue creada por Facebook y es utilizada ampliamente en el desarrollo web moderno.',
      },
      {
        titulo: 'Introducción a React',
        videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
      },
      {
        titulo: 'Componentes y Props',
        videoUrl: 'https://www.youtube.com/embed/MhkGQAoc7bc',
      },
      {
        titulo: 'Estado y Ciclo de Vida',
        descripcion: 'El estado permite a los componentes llevar información interna, y el ciclo de vida define etapas como montaje, actualización y desmontaje.',
      },
      {
        titulo: 'Hooks Básicos',
        videoUrl: 'https://www.youtube.com/embed/f687hBjwFcM',
      },
      {
        titulo: 'JSX y Renderizado Condicional',
        descripcion: 'JSX es una sintaxis parecida a HTML que se transforma a JavaScript. Puedes usar expresiones JS dentro de JSX para renderizar contenido condicionalmente.',
      },
    ],
    precioCertificado: 50,
    idCertificado: 1,
  },
  {
    id: 2,
    titulo: 'JavaScript Moderno',
    descripcion: 'Domina ES6+ y conceptos modernos de JS.',
    contenido: [
      {
        titulo: '¿Por qué JavaScript moderno?',
        descripcion: 'JavaScript ha evolucionado significativamente desde ES6. Hoy en día, se espera que los desarrolladores usen funciones modernas para escribir código más limpio y mantenible.',
      },
      {
        titulo: 'Funciones flecha',
        videoUrl: 'https://www.youtube.com/embed/h33Srr5J9nY',
      },
      {
        titulo: 'Destructuración',
        descripcion: 'Permite extraer valores de arrays u objetos fácilmente. Ejemplo: `const {nombre} = persona;`',
      },
      {
        titulo: 'Promesas y Async/Await',
        videoUrl: 'https://www.youtube.com/embed/V_Kr9OSfDeU',
      },
      {
        titulo: 'Spread y Rest',
        descripcion: 'Estas funciones permiten manipular listas de manera eficiente. Spread clona o combina estructuras. Rest permite capturar argumentos variables.',
      },
      {
        titulo: 'Módulos de JavaScript',
        descripcion: 'ES Modules (ESM) permiten importar y exportar código entre archivos, promoviendo la modularidad.',
      },
    ],
    precioCertificado: 40,
    idCertificado: 2,
  },
  {
    id: 3,
    titulo: 'Python para Principiantes',
    descripcion: 'Introducción a Python paso a paso.',
    contenido: [
      {
        titulo: '¿Qué es Python?',
        descripcion: 'Python es un lenguaje de alto nivel, fácil de leer y con gran comunidad. Es ideal para principiantes y usado en ciencia de datos, desarrollo web y automatización.',
      },
      {
        titulo: 'Sintaxis básica',
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
      },
      {
        titulo: 'Variables y Tipos de Datos',
        descripcion: 'En Python no necesitas declarar el tipo de variable. Puedes usar enteros, floats, strings, listas, diccionarios, entre otros.',
      },
      {
        titulo: 'Manejo de archivos',
        videoUrl: 'https://www.youtube.com/watch?v=71xSLk8l25Q',
      },
      {
        titulo: 'Funciones y Bucles',
        descripcion: 'Las funciones se definen con `def` y los bucles con `for` o `while`. Puedes iterar fácilmente listas y diccionarios.',
      },
      {
        titulo: 'Errores comunes y cómo evitarlos',
        descripcion: 'Aprende a interpretar errores de sintaxis y de tipo. Usa `try...except` para manejar excepciones de forma segura.',
      },
    ],
    precioCertificado: 30,
    idCertificado: 3,
  },
];

export default cursos;
