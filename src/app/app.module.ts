import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';  // Asegúrate de que el componente está importado
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { MatSelectModule } from '@angular/material/select';  // Asegúrate de importar este módulo
import { MatOptionModule } from '@angular/material/core';  // Asegúrate de importar este módulo
// Importar Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';  // Necesario para trabajar con formularios reactivos

import { HttpClientModule } from '@angular/common/http';  // Aquí es donde se importa HttpClientModule






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,  
    MatSelectModule,  // Añadir MatSelectModule
    MatOptionModule,  // Añadir MatOptionModule
    ReactiveFormsModule,  // Añadir ReactiveFormsModule
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
