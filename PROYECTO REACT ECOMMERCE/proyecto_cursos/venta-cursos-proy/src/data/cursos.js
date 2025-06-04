// src/data/cursos.js
const cursos = [
  {
    id: 1,
    titulo: 'Curso de React Básico',
    descripcion: 'Aprende los fundamentos de React.',
    contenido: [
      {
        titulo: 'Introducción a React',
        videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
      },
      {
        titulo: 'Componentes y Props',
        videoUrl: 'https://www.youtube.com/embed/MhkGQAoc7bc',
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
        titulo: 'Funciones flecha',
        videoUrl: 'https://www.youtube.com/embed/h33Srr5J9nY',
      },
      {
        titulo: 'Promesas y Async/Await',
        videoUrl: 'https://www.youtube.com/embed/V_Kr9OSfDeU',
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
        titulo: 'Sintaxis básica',
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
      },
      {
        titulo: 'Manejo de archivos',
        videoUrl: 'https://www.youtube.com/watch?v=71xSLk8l25Q',
      },
    ],
    precioCertificado: 30,
    idCertificado: 3,
  },
];

export default cursos;
