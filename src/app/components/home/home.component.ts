import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteService } from '../../services/estudiante.services';
import { AppComponent } from '../../app.component';
//import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../registrar-estudiante/register.component';  // Asegúrate de que el componente está importado
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  showRegisterForm: boolean = false;
  searchTerm: string = '';
  displayedColumns: string[] = ['nombre', 'documento', 'acciones']; // Columnas que se mostrarán en la tabla
  errorMessage: string = ''; 
  constructor(private estudianteService: EstudianteService,  private router: Router) {}

  ngOnInit(): void {
    this.loadEstudiantes();

      // Cargar lista inicial de estudiantes
    this.estudianteService.getEstudiantes()
      .subscribe(lista => this.estudiantes = lista);
  }

    agregarEstudianteATabla(estudiante: Estudiante) {
    // Agregar el nuevo estudiante a la lista y refrescar la tabla
    this.estudiantes.push(estudiante);
    // Alternativamente, volver a consultar el servicio si se prefiere obtener datos actualizados del backend
    // this.estudianteService.getEstudiantes().subscribe(lista => this.estudiantes = lista);
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

  // Método para editar estudiante
  editEstudiante(estudiante: Estudiante) {
    // Redirigir al formulario de edición
    console.log('Editar estudiante id', estudiante.id);
     if (estudiante && estudiante.id) {
    this.router.navigate(['/edit-estudiante', estudiante.id]);
  } else {
    console.error('ID de estudiante no válido');
  }
  }

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
  registerClasses(estudiante: Estudiante) {
    console.log('Registrar clases para', estudiante);
    // Redirigir al formulario para registrar clases
      this.router.navigate(['/register-clases', estudiante.id]);
  }

  // Método para ver las clases de un estudiante
  viewClasses(estudiante: Estudiante) {
    console.log('Ver clases de', estudiante);
    // Lógica para obtener los compañeros de clase o mostrar las clases registradas
     this.router.navigate(['/view-clases', estudiante.id]);
  }

}
