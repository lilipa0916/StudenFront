import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/Estudiante';
import { EstudianteService } from '../../services/estudiante.services';
import { AppComponent } from '../../app.component';
//import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';  // Asegúrate de que el componente está importado

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  showRegisterForm: boolean = false;
  showSearchForm: boolean = false;
  searchTerm: string = '';

  constructor(private estudianteService: EstudianteService) {}

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
    this.showSearchForm = false;
  }

  // Mostrar el formulario para buscar un estudiante
  showSearch() {
    this.showSearchForm = true;
    this.showRegisterForm = false;
  }

  // Filtrar estudiantes por nombre
  searchEstudiantes() {
    if (this.searchTerm) {
      this.estudiantes = this.estudiantes.filter(estudiante =>
        estudiante.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadEstudiantes(); // Si no hay término de búsqueda, recargar todos los estudiantes
    }
  }
}
