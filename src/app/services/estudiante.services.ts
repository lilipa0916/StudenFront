import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante,  } from '../models/Estudiante';
import { EstudianteCreateDto } from '../models/estudiante-create-dto.model';

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
    registerEstudiante(estudiante: EstudianteCreateDto): Observable<EstudianteCreateDto> {
        return this.http.post<EstudianteCreateDto>(`${this.apiUrl}/estudiantes`, estudiante);
    }

    getCompaneros(estudianteId: number): Observable<Estudiante[]> {
        return this.http.get<Estudiante[]>(`${this.apiUrl}/${estudianteId}/companeros`);
    }

    //     getMaterias(): Observable<Materia[]> {
    //     return this.http.get<Materia[]>(`${this.apiUrl}/materias`);
    // }
}
