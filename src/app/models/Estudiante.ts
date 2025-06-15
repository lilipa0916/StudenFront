import { Materia } from './Materia'; // Importa el modelo Materia

export interface Estudiante {
  id: number;
  nombre: string;
  documento: string;
  materias: Materia[];
}