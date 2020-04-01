import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { FirstLoginComponent } from './pages/auth/first-login/first-login.component';
import { UpdatePasswordComponent } from './pages/auth/update-password/update-password.component';
import { IsaComponent } from './pages/isa/isa.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'first-login', component: FirstLoginComponent},
    { path: 'update-password', component: UpdatePasswordComponent},
    { path: 'isa', component: IsaComponent},

    { path: 'dashboard', component: IsaComponent, children: [
  ]
},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
