export interface EstudianteCreateDto {
  id: number;
  nombre: string;
  documento: string;
  materiaIds: number[];  
}