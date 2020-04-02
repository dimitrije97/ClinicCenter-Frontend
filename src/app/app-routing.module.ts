import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { FirstLoginComponent } from './pages/auth/first-login/first-login.component';
import { IsaComponent } from './pages/isa/isa.component';
import { UpdatePasswordComponent } from './pages/isa/update-password/update-password.component';
import { PatientsComponent } from './pages/isa/lists/patients/patients.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/registration', component: RegistrationComponent},
    { path: 'auth/:id/new-password', component: FirstLoginComponent},
    {
      path: 'dashboard', component: IsaComponent, children: [
        { path: 'update-password', component: UpdatePasswordComponent},
        { path: 'patients', component: PatientsComponent},
        { path: 'patients/:id/clinic', component: PatientsComponent}
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
