import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteService } from '../../services/estudiante.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  showRegisterForm: boolean = false;
  displayedColumns: string[] = ['nombre', 'documento', 'acciones'];  
  errorMessage: string = ''; 
  constructor(private estudianteService: EstudianteService,  private router: Router) {}

  ngOnInit(): void {
     this.showRegisterForm = false;
    this.loadEstudiantes();

  }


  loadEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe((estudiantes) => {
      this.estudiantes = estudiantes;
    });
  }

  showRegister() {
    this.showRegisterForm = true;
  }

  onStudentRegistered(): void {
    this.showRegisterForm = false;
    this.loadEstudiantes();
  }


  deleteEstudiante(estudianteId: number) {
    console.log('Eliminar estudiante', estudianteId);
    if (confirm('¿Estás seguro de que deseas eliminar a este estudiante?')) {
      this.estudianteService.deleteEstudiante(estudianteId).subscribe(
        (response) => {
          console.log('Estudiante eliminado', response);
          this.loadEstudiantes();
          this.errorMessage='';
        },
        (error) => {
          if (error.status === 400 && error.error) {
          this.errorMessage = error.error; 
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
          this.loadEstudiantes(); 
        }
        console.error('Error al registrar estudiante', error);
        }
      );
    }
  }

  viewClases(id: number): void {
    this.router.navigate(['/view-clases', id]);
  }

  editEstudiante(id: number) {
     this.router.navigate(['/edit-estudiante', id]);
  }
}
