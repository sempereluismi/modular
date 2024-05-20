function comprobarHoras (profesores) {
  return profesores.some(profesor => profesor.horasTotal < 18 || profesor.horasTotal > 20) ? true : 'Todos los profesores deben estar entre 18 y 20 horas'
}

export function checkProfesores (profesores) {
  return comprobarHoras(profesores)
}
