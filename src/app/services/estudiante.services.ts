import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante,  } from '../models/Estudiante';
import { ClasesCompaneros } from '../models/Clases-companeros';
import { EstudianteCreateDto } from '../models/Estudiante-create-dto.model';

@Injectable({
    providedIn: 'root'
})
export class EstudianteService {
    private apiUrl = 'https://localhost:7299/api';

    constructor(private http: HttpClient) { }

    getEstudiantes(): Observable<Estudiante[]> {
        return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiantes`);
    }

    getEstudianteById(id: number): Observable<Estudiante> {
        return this.http.get<Estudiante>(`${this.apiUrl}/${id}`);
    }
    registerEstudiante(estudiante: EstudianteCreateDto): Observable<Estudiante> {
        return this.http.post<Estudiante>(`${this.apiUrl}/estudiantes`, estudiante);
    }

    getCompaneros(estudianteId: number): Observable<ClasesCompaneros> {
        return this.http.get<ClasesCompaneros>(`${this.apiUrl}/${estudianteId}/companeros`);
    }

    deleteEstudiante(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/estudiantes/${id}`);
    }

    updateEstudiante(id: number, estudiante: EstudianteCreateDto): Observable<void> {
        const url = `${this.apiUrl}/estudiantes/${id}`;
        return this.http.put<void>(url, estudiante);
    }

}
