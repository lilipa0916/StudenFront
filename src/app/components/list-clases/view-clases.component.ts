import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.services';
import { ClasesCompaneros } from 'src/app/models/Clases-companeros';

@Component({
  selector: 'app-view-clases',
  templateUrl: './view-clases.component.html',
  styleUrls: ['./view-clases.component.scss']
})
export class ViewClasesComponent implements OnInit {
  estudianteId!: number;
  clases: any[] = [];
  companeros: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit(): void {
    this.estudianteId = +this.route.snapshot.paramMap.get('id')!;
    this.loadClases();
  }

  loadClases() {
    this.estudianteService.getCompaneros(this.estudianteId).subscribe((data: ClasesCompaneros) => {
      this.clases = data.clases; // Accede a las clases
      this.companeros = data.companeros; // Accede a los compañeros
    });
  }
}
