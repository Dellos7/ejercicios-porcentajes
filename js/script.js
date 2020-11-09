import { JuegoPorcentajes } from './JuegoPorcentajes.js';

const juegoPorcentajes = new JuegoPorcentajes();

const formEmpezarEjerciciosEl = document.getElementById('empezar-ejercicios-form');
const ejerciciosEl = document.getElementById('ejercicios');
formEmpezarEjerciciosEl.addEventListener('submit', (e) => {
    e.preventDefault();
    formEmpezarEjerciciosEl.classList.add('oculto');
    ejerciciosEl.classList.remove('oculto');
    juegoPorcentajes.empezar();
});

const formSiguienteEjercicioEl = document.getElementById('siguiente-ejercicio-form');
formSiguienteEjercicioEl.addEventListener('submit', (e) => {
    e.preventDefault();
    juegoPorcentajes.nuevoEjercicio();
});