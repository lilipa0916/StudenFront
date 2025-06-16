import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.services';
import { MateriaService } from '../../services/materia.service';
import { Estudiante } from '../../models/Estudiante';
import { Materia } from '../../models/Materia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteCreateDto } from 'src/app/models/Estudiante-create-dto.model';

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

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService, 
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      materias: [[], [Validators.required]]

    });
  }
  materiasValidator = (control: any) => {
    const selected: number[] = control.value;
    const errors: any = {};
    if (!selected || selected.length === 0) {
      errors['required'] = true;  // Error si no se seleccionan materias
    }
    if (selected.length > 3) {
      errors['maxMaterias'] = true;  // Error si se seleccionan más de 3 materias
    }
    return Object.keys(errors).length ? errors : null;
  }

  ngOnInit(): void {

    this.estudianteId = +this.route.snapshot.paramMap.get('id')!||0;
    this.loadEstudiante();
    this.loadMaterias();
  }


  loadMaterias() {
    this.materiaService.getMaterias().subscribe((materias) => {
      this.materias = materias;  
    });
    this.updateTotalCreditos();
  }

  loadEstudiante() {
    this.estudianteService.getEstudianteById(this.estudianteId).subscribe((data) => {
      this.estudiante = data;

        const materiasSeleccionadas = data.materias.map((m: any) => m.materiaId);  
       
      const ids = this.estudiante.materias.map(m => m.id);
      this.estudianteForm.patchValue({ materias: ids });

      this.estudianteForm.setValue({
        nombre: this.estudiante.nombre,
        documento: this.estudiante.documento,
        materias: materiasSeleccionadas
        
      });        
      this.updateTotalCreditos();
    });
  }
  updateTotalCreditos() {
    const selectedMaterias = this.estudianteForm.value.materias;
    this.totalCreditos = 0;

    selectedMaterias.forEach((materiaId: number) => {
      const materia = this.materias.find((m) => m.id === materiaId);
      if (materia) {
        this.totalCreditos += materia.creditos;
      }
    });
  }
  
 onSubmit() {
  console.log('Formulario válido?'); 
  console.log('Formulario válido?', this.estudianteForm.valid); 

    if (this.estudianteForm.valid) {
      const updatedEstudiante: EstudianteCreateDto = {
        id: this.estudianteId,
        nombre: this.estudianteForm.value.nombre,
        documento: this.estudianteForm.value.documento,
        materiaIds: this.estudianteForm.value.materias 
      };

      this.estudianteService.updateEstudiante(this.estudianteId, updatedEstudiante).subscribe(
        () => {
          this.router.navigate(['/home']); 
        },
        (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessage = error.error;  
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
        console.error('Error al a estudiante', error);
      }
      );
    }
  }

  Volver(){
    this.router.navigate(['/home']);
  }
}