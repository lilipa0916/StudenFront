import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-clases',
  templateUrl: './view-clases.component.html',
  styleUrls: ['./view-clases.component.scss']
})
export class ViewClasesComponent implements OnInit {
  estudianteId!: number;
  clases: any[] = [];
  displayedColumns: string[] = ['materiaNombre', 'companeros']; // Columnas a mostrar en la tabla
  totalCreditos: number = 0; 

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Id en edit estudiante view');

    this.estudianteId = +this.route.snapshot.paramMap.get('id')!;
    this.loadClases();
  }


loadClases() {
    // Suponiendo que ya tienes la función en el servicio de estudiante para obtener los compañeros y materias
    this.estudianteService.getCompaneros(this.estudianteId).subscribe((data: any[]) => {
      console.log('Datos recibidos:', data);

      // Asignar el array de datos al objeto 'clases' para la vista
      this.clases = data;
         this.totalCreditos = this.clases.length * 3;
    });
  }
Volver(){
    this.router.navigate(['/home']);

}
}
