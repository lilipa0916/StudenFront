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
  displayedColumns: string[] = ['nombre', 'documento', 'acciones']; // Columnas que se mostrarán en la tabla
  errorMessage: string = ''; 
  constructor(private estudianteService: EstudianteService,  private router: Router) {}

  ngOnInit(): void {
    this.loadEstudiantes();
  }


  // Cargar todos los estudiantes al inicio
  loadEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe((estudiantes) => {
      this.estudiantes = estudiantes;
    });
  }

  // Mostrar el formulario para registrar un estudiante
  showRegister() {
    this.showRegisterForm = true;
  }

  onStudentRegistered(): void {
    // Ocultar el formulario de registro
    this.showRegisterForm = false;
    // Actualizar la lista de estudiantes para incluir el nuevo registro
    this.loadEstudiantes();
  }
  // Método para editar estudiante


  deleteEstudiante(estudiante: Estudiante) {
    console.log('Eliminar estudiante', estudiante);
    // Confirmación de eliminación (puedes agregar un diálogo de confirmación si lo deseas)
    if (confirm('¿Estás seguro de que deseas eliminar a este estudiante?')) {
      this.estudianteService.deleteEstudiante(estudiante.id).subscribe(
        (response) => {
          console.log('Estudiante eliminado', response);
          this.loadEstudiantes(); // Recargar la lista de estudiantes después de eliminar
          this.errorMessage='';
        },
        (error) => {
          if (error.status === 400 && error.error) {
          this.errorMessage = error.error;  // Asignamos el mensaje de error directamente desde el backend
        } else {
          // Mensaje genérico si no hay mensaje específico
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
          this.loadEstudiantes(); // Recargar la lista de estudiantes después de eliminar
        }
        console.error('Error al registrar estudiante', error);
        }
      );
    }
  }

  // Método para registrar clases para un estudiante
  // registerClasses(estudiante: Estudiante) {
  //   console.log('Registrar clases para', estudiante);
  //   // Redirigir al formulario para registrar clases
  //     this.router.navigate(['/lista']);
  //     // this.router.navigate(['/register-clases', estudiante.id]);
  // }

  viewClases(id: number): void {
    console.log('Ver clases Id estudiante', id);
      // this.router.navigate(['/lista']);
    this.router.navigate(['/view-clases', id]);
  }

    editEstudiante(id: number) {
    // Redirigir al formulario de edición
     this.router.navigate(['/edit-estudiante', id]);
  }
}
