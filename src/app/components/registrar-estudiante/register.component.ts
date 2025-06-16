import { Component, OnInit,EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.services';
import { MateriaService } from '../../services/materia.service';
import { ProfesorService } from '../../services/profesor.service';
import { Materia} from '../../models/Materia';
import { Profesor} from '../../models/Profesor';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteCreateDto } from '../../models/Estudiante-create-dto.model';
import { Router } from '@angular/router';


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
    errorMessage: string = ''; 
    successMessage: string = ''; 
    totalCreditos: number = 0; 
    constructor(
        private fb: FormBuilder, 
        private estudianteService: EstudianteService,
        private materiaService: MateriaService,
        private router: Router,
        private profesorService: ProfesorService) {
        this.registerForm = this.fb.group({
            nombre: ['', Validators.required],
            documento: ['', Validators.required],
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
        this.updateTotalCreditos(); 
    }

    updateTotalCreditos() {
    const selectedMaterias = this.registerForm.value.materias;
    this.totalCreditos = 0;

    // Iterar sobre las materias seleccionadas y sumar los créditos
    selectedMaterias.forEach((materiaId: number) => {
      const materia = this.materias.find((m) => m.id === materiaId);
      if (materia) {
        this.totalCreditos += materia.creditos;
      }
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
    const estudianteCreateDto: EstudianteCreateDto = {
      id:0,
      nombre: this.registerForm.value.nombre,
      documento: this.registerForm.value.documento,
      materiaIds: this.registerForm.value.materias // Pasamos las materias seleccionadas
    };

  this.estudianteService.registerEstudiante(estudianteCreateDto).subscribe(
      (response) => {
        console.log('Estudiante registrado', response);
        this.registerForm.reset()
        this.successMessage = '¡Estudiante registrado con éxito!';
        this.errorMessage = ''; // Limpiar cualquier mensaje de error en caso de éxito
        this.router.navigate(['/home']);
      },
      (error) => {
        // Verificar que el error tenga un mensaje
        if (error.status === 400 && error.error) {
          this.errorMessage = error.error;  
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
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