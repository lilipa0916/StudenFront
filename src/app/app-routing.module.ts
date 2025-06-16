import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component' ;
import { RegisterComponent } from './components/registrar-estudiante/register.component'; 
import { ViewClasesComponent } from './components/list-clases/view-clases.component';  
import { EditEstudianteComponent } from './components/editar-estudiante/edit-estudiante.component';  

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'edit-estudiante/:id', component: EditEstudianteComponent },
  { path: 'view-clases/:id', component: ViewClasesComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
