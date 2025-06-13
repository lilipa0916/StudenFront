import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.services';
import { Estudiante } from '../../models/Estudiante';

@Component({
    selector: 'app-lista-estudiantes',
    templateUrl: './lista-estudiantes.component.html',
    styleUrls: ['./lista-estudiantes.component.scss']
})
export class ListaEstudiantesComponent implements OnInit {
    estudiantes: Estudiante[] = [];

    constructor(private estudianteService: EstudianteService) {}

    ngOnInit() {
        this.estudianteService.getEstudiantes().subscribe((estudiantes) => {
            this.estudiantes = estudiantes;
        });
    }
}