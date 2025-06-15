import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component' ;
import { RegisterComponent } from './components/registrar-estudiante/register.component';  // Si tienes una página de registro
import { ViewClasesComponent } from './components/list-clases/view-clases.component';  // Si tienes una página de registro
import { EditEstudianteComponent } from './components/editar-estudiante/edit-estudiante.component';  // Si tienes una página de registro
import { RegisterClasesComponent } from './components/registrar-clases/register-clases.component';  // Si tienes una página de registro

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-estudiante/:id', component: EditEstudianteComponent },
  { path: 'register-clases/:id', component: RegisterClasesComponent },
  { path: 'view-clases/:id', component: ViewClasesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Aquí otras rutas que necesites
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
