import { Routes } from '@angular/router';
import { FormComponent } from './form-component/form-component.component';
import { InsertComponent } from './insert/insert.component'; // Importa el componente Insert

export const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'insert', component: InsertComponent }, 
  { path: '', redirectTo: '/form', pathMatch: 'full' }
];
