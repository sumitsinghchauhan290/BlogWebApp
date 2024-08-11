import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogRegisterComponent } from './Component/blog-register/blog-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/blogRegister', pathMatch: 'full' },
  { path: 'blogRegister', component: BlogRegisterComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
