import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.services';
import { MateriaService } from '../../services/materia.service';
import { Estudiante } from '../../models/Estudiante';
import { Materia } from '../../models/Materia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteCreateDto } from 'src/app/models/Estudiante-create-dto.model';
// import { MatFormFieldModule, MatInputModule, MatButtonModule, MatErrorModule, MatLabelModule } from '@angular/material';

@Component({
  selector: 'app-edit-estudiante',
  templateUrl: './edit-estudiante.component.html',
  styleUrls: ['./edit-estudiante.component.scss']
})
export class EditEstudianteComponent implements OnInit {
  estudianteForm: FormGroup;
  estudianteId: number=0;
  estudiante!: Estudiante;
  errorMessage: string = '';
  materias: Materia[] = [];
  totalCreditos: number = 0;
  profesorMaterias: Set<number> = new Set(); // Para verificar que solo se selecciona una materia por profesor

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService, // Servicio de Materias
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      materias: [[], Validators.required]
    });
  }
  // materiasValidator(control: any): { [key: string]: boolean } | null {
    // const selectedMaterias = control.value;
    
    // if (selectedMaterias.length > 3) {
    //   return { 'maxMaterias': true };
    // }

    // // Verificar que no haya materias con el mismo profesor
    // const profesorIds = selectedMaterias.map((materiaId: number) => {
    //   const materia = this.materias.find((m) => m.id === materiaId);
    //   return materia ? materia.id : null;
    // });
    
    // const uniqueProfesorIds = new Set(profesorIds);
    // if (uniqueProfesorIds.size !== profesorIds.length) {
    //   return { 'sameProfessor': true }; // Error si hay dos materias con el mismo profesor
    // }

    // return null;
    
  // }

  
  materiasValidator(control: any): { [key: string]: boolean } | null {
      if (control.value.length > 3) {
      return { 'maxMaterias': true };
      }
      return null;
  }  

  ngOnInit(): void {
        console.log('Id en edit estudiante edit clases',this.route.snapshot.paramMap.get('id'));

    this.estudianteId = +this.route.snapshot.paramMap.get('id')!||0;
    this.loadEstudiante();
    this.loadMaterias();
  }


  loadMaterias() {
    this.materiaService.getMaterias().subscribe((materias) => {
      this.materias = materias;  // Guardar las materias disponibles
    });
     this.updateTotalCreditos();
  }

  loadEstudiante() {
    this.estudianteService.getEstudianteById(this.estudianteId).subscribe((data) => {
      console.log ('Data edid', data)
      this.estudiante = data;
      this.estudianteForm.setValue({
        nombre: this.estudiante.nombre,
        documento: this.estudiante.documento,
        materias: this.estudiante.materias.map((materia) => materia.id) // Asumimos que las materias son un array de objetos
      });
      this.updateTotalCreditos();
    });
  }
  updateTotalCreditos() {
    const selectedMaterias = this.estudianteForm.value.materias;
    this.totalCreditos = 0;
    this.profesorMaterias.clear(); 

    // Iterar sobre las materias seleccionadas y sumar los créditos
    selectedMaterias.forEach((materiaId: number) => {
      const materia = this.materias.find((m) => m.id === materiaId);
      if (materia) {
        this.totalCreditos += materia.creditos;
        this.profesorMaterias.add(materia.id);
      }
    });
  }
 onSubmit() {
    if (this.estudianteForm.valid) {
      const updatedEstudiante: EstudianteCreateDto = {
        id: this.estudianteId,
        nombre: this.estudianteForm.value.nombre,
        documento: this.estudianteForm.value.documento,
        materiaIds: this.estudianteForm.value.materias // Pasamos las materias seleccionadas
      };

      this.estudianteService.updateEstudiante(this.estudianteId, updatedEstudiante).subscribe(
        () => {
          this.router.navigate(['/home']); // Redirigir a la página de inicio
        },
        (error) => {
        // Verificar que el error tenga un mensaje
        if (error.status === 400 && error.error) {
          this.errorMessage = error.error;  // Asignamos el mensaje de error directamente desde el backend
        } else {
          // Mensaje genérico si no hay mensaje específico
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
        console.error('Error al a estudiante', error);
      }
      );
    }
  }
}