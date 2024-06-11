import { MAX_HORAS_SEMANALES, MAX_TIPOS_MODULOS, MIN_HORAS_SEMANALES } from './constants'

export function checkProfesores (profesores) {
  return profesores.map((profesor) => {
    return {
      ...profesor,
      info: checkProfesor(profesor)
    }
  })
}

function checkProfesor (profesor) {
  const info = {}
  info.horas = checkHoras(profesor)
  info.maxTipos = checkMaxTipos(profesor)
  info.especialidad = checkEspecialidad(profesor)
  return info
}

function checkHoras (profesor) {
  if (profesor.horasTotal < MIN_HORAS_SEMANALES || profesor.horasTotal > MAX_HORAS_SEMANALES) {
    return `${profesor.nombre} no cumple con el rango de horas estipulado`
  }
  return null
}

function checkMaxTipos (profesor) {
  const tiposModulos = new Set()

  profesor.modulos.forEach((modulo) => {
    tiposModulos.add(modulo.color)
  })
  return (tiposModulos.size > MAX_TIPOS_MODULOS) ? `${profesor.nombre} tiene más de dos tipos de especialidad` : null
}

function checkEspecialidad (profesor) {
  const especialidadModulos = new Set()
  profesor.modulos.forEach((modulo) => {
    console.log(modulo)
    especialidadModulos.add(modulo.especialidad)
  })

  // console.log(especialidadModulos)
}
