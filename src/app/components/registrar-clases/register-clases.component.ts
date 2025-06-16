import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.services';
import { MateriaService } from '../../services/materia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-clases',
  templateUrl: './register-clases.component.html',
  styleUrls: ['./register-clases.component.scss']
})
export class RegisterClasesComponent implements OnInit {
  clasesForm: FormGroup;
  estudianteId!: number;
  materias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clasesForm = this.fb.group({
      materias: [[], [Validators.required, this.materiasValidator]]
    });
  }

  ngOnInit(): void {
    this.estudianteId = +this.route.snapshot.paramMap.get('id')!;
    this.loadMaterias();
  }

  loadMaterias() {
    this.materiaService.getMaterias().subscribe((materias) => {
      this.materias = materias;
    });
  }

  materiasValidator(control: any): { [key: string]: boolean } | null {
    if (control.value.length > 3) {
      return { 'maxMaterias': true };
    }
    return null;
  }

  onSubmit() {
    if (this.clasesForm.valid) {
      const registroClases = {
        estudianteId: this.estudianteId,
        materias: this.clasesForm.value.materias
      };

      // this.estudianteService.registerClases(registroClases).subscribe(() => {
      //   this.router.navigate(['/home']); // Redirigir al Home después de registrar las clases
      // });
    }
  }
}
