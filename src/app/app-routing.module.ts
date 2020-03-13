import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SignupSelectComponent } from './components/auth/signup-select/signup-select.component';


const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : SignupSelectComponent},
  {path : 'register/user', component : SignupComponent},
  {path : 'register/merchant', component : SignupComponent},
  {path : '', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
