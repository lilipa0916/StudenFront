import { Estudiante } from './Estudiante'; // Asegúrate de que Estudiante esté importado
import { Materia } from './Materia'; // Asegúrate de que Estudiante esté importado

export interface ClasesCompaneros {
  clases: Materia[]; // O la estructura de clases que estés manejando en tu backend
  companeros: Estudiante[]; // Lista de los estudiantes que comparten clase
}
