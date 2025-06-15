export interface EstudianteCreateDto {
  id: number;
  nombre: string;
  documento: string;
  materiaIds: number[];  // Lista de IDs de las materias seleccionadas
}