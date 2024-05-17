function comprobarHoras (profesores) {
  return profesores.some(profesor => profesor.horasTotal < 18 || profesor.horasTotal > 20)
}

export function checkProfesores (profesores) {
  return comprobarHoras(profesores)
}
