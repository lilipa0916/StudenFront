import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from '../models/Profesor';
import { ProfesorMateria } from '../models/profesor-materia';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'https://localhost:7299/api';

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiUrl}/profesores`);
  }

    getProfesoresPorMateria(materiaId: number): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiUrl}/materias/${materiaId}`);
  }
}
