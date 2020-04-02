import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { FirstLoginComponent } from './pages/auth/first-login/first-login.component';
import { IsaComponent } from './pages/isa/isa.component';
import { UpdatePasswordComponent } from './pages/isa/update-password/update-password.component';
import { PatientsComponent } from './pages/isa/lists/patients/patients.component';
import { ProfileComponent } from './pages/isa/profiles/profile/profile.component';
import { PatientComponent } from './pages/isa/profiles/patient/patient.component';
import { AdminComponent } from './pages/isa/profiles/admin/admin.component';
import { DoctorComponent } from './pages/isa/profiles/doctor/doctor.component';
import { AdminsComponent } from './pages/isa/lists/admins/admins.component';
import { DoctorsComponent } from './pages/isa/lists/doctors/doctors.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/registration', component: RegistrationComponent},
    { path: 'auth/:id/new-password', component: FirstLoginComponent},
    {
      path: 'dashboard', component: IsaComponent, children: [
        { path: 'update-password', component: UpdatePasswordComponent},
        { path: 'patients', component: PatientsComponent},
        { path: 'admins', component: AdminsComponent},
        { path: 'doctors', component: DoctorsComponent},
        { path: 'patients/:id/clinic', component: PatientsComponent},
        { path: 'doctors/:id/clinic', component: DoctorsComponent},
        { path: 'admins/:id/clinic', component: AdminsComponent},
        { path: 'profile/:id/patient', component: PatientComponent},
        { path: 'profile/:id/admin', component: AdminComponent},
        { path: 'profile/:id/doctor', component: DoctorComponent},
        { path: 'my-profile', component: ProfileComponent}
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
