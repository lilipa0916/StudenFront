import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.services';
import { MateriaService } from '../../services/materia.service';
import { ProfesorService } from '../../services/profesor.service';
import { Materia} from '../../models/Materia';
import { Profesor} from '../../models/Profesor';
import { Estudiante } from '../../models/Estudiante';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    materias: Materia[] = [];
    profesores: Profesor[] = [];
    estudiantes: Estudiante[] = [];
    
    constructor(
        private fb: FormBuilder, 
        private estudianteService: EstudianteService,
        private materiaService: MateriaService,
        private profesorService: ProfesorService) {
        this.registerForm = this.fb.group({
            nombre: ['', Validators.required],
            materias: [[], [Validators.required, this.materiasValidator]]
        });
    }

    ngOnInit() {
        this.loadMaterias();
        this.loadProfesores();
        this.loadEstudiantes();
    }

    loadMaterias() {
        this.materiaService.getMaterias().subscribe((materias) => {
        this.materias = materias;
        });
    }

    loadProfesores() {
        this.profesorService.getProfesores().subscribe((profesores) => {
        this.profesores = profesores;
        });
    }    

    loadEstudiantes() {
        this.estudianteService.getEstudiantes().subscribe((estudiantes) => {
        this.estudiantes = estudiantes;
        });
    }

    materiasValidator(control: any): { [key: string]: boolean } | null {
        if (control.value.length > 3) {
        return { 'maxMaterias': true };
        }
        return null;
    }    

    onSubmit() {
        if (this.registerForm.valid) {
        const estudiante = this.registerForm.value;
        this.estudianteService.registerEstudiante(estudiante).subscribe(
            (response) => {
            console.log('Estudiante registrado', response);
            },
            (error) => {
            console.error('Error al registrar estudiante', error);
            }
        );
        }
    }    

    // getProfesoresDeMateria(materiaId: number): Profesor[] {
    //     return this.profesores.filter(
    //         (profesor) => profesor.materias.some((materia) => materia.id === materiaId)
    //         );
    // }

    getProfesoresDeMateria(materiaId: number): Profesor[] {
        // Obtener los profesores que están asociados a la materia seleccionada
        const profesoresDeMateria: Profesor[] = [];
        this.profesorService.getProfesoresPorMateria(materiaId).subscribe(
        (profesores) => {
            profesoresDeMateria.push(...profesores);
        },
        (error) => {
            console.error('Error al obtener profesores de la materia', error);
        }
        );
        return profesoresDeMateria;
    }
    getCompañeros() {
        const estudianteId = this.registerForm.value.estudianteId;
        this.estudianteService.getCompaneros(estudianteId).subscribe((companeros) => {
            console.log(companeros);
        });
    }

}