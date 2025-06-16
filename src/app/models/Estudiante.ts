import { Materia } from './Materia';

export interface Estudiante {
  id: number;
  nombre: string;
  documento: string;
  materias: Materia[];
}