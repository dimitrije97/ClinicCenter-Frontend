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
import { ClinicComponent } from './pages/isa/profiles/clinic/clinic.component';
import { ClinicsComponent } from './pages/isa/lists/clinics/clinics.component';
import { EmergencyRoomsComponent } from './pages/isa/lists/emergency-rooms/emergency-rooms.component';
import { ExaminationTypesComponent } from './pages/isa/lists/examination-types/examination-types.component';
import { ExaminationTypeComponent } from './pages/isa/profiles/examination-type/examination-type.component';
import { EmergencyRoomComponent } from './pages/isa/profiles/emergency-room/emergency-room.component';
import { NewDoctorComponent } from './pages/isa/create-forms/new-doctor/new-doctor.component';
import { NewNurseComponent } from './pages/isa/create-forms/new-nurse/new-nurse.component';
import { NewEmergencyRoomComponent } from './pages/isa/create-forms/new-emergency-room/new-emergency-room.component';
import { NewExaminationTypeComponent } from './pages/isa/create-forms/new-examination-type/new-examination-type.component';
import { NursesComponent } from './pages/isa/lists/nurses/nurses.component';
import { NurseComponent } from './pages/isa/profiles/nurse/nurse.component';
import { NewPotentialExaminationComponent } from './pages/isa/create-forms/new-potential-examination/new-potential-examination.component';
import { PotentialExaminationsComponent } from './pages/isa/lists/potential-examinations/potential-examinations.component';
import { PendingExaminationsComponent } from './pages/isa/lists/pending-examinations/pending-examinations.component';
import { PendingVacationsComponent } from './pages/isa/lists/pending-vacations/pending-vacations.component';
import { NewVacationRequestComponent } from './pages/isa/create-forms/new-vacation-request/new-vacation-request.component';
import { NewExaminationByDoctorComponent } from './pages/isa/create-forms/new-examination-by-doctor/new-examination-by-doctor.component';
import { NewExaminationByPatientComponent } from './pages/isa/create-forms/new-examination-by-patient/new-examination-by-patient.component';
import { ConfirmingExaminationsComponent } from './pages/isa/lists/confirming-examinations/confirming-examinations.component';
import { DoctorCalendarComponent } from './pages/isa/lists/doctor-calendar/doctor-calendar.component';
import { FutureExaminationsComponent } from './pages/isa/lists/future-examinations/future-examinations.component';
import { ExaminationsHistoryComponent } from './pages/isa/lists/examinations-history/examinations-history.component';
import { DoctorsWhoCanBeGradedComponent } from './pages/isa/lists/doctors-who-can-be-graded/doctors-who-can-be-graded.component';
import { ClinicsWhichCanBeGradedComponent } from './pages/isa/lists/clinics-which-can-be-graded/clinics-which-can-be-graded.component';
import { PricelistComponent } from './pages/isa/lists/pricelist/pricelist.component';
import { PendingRegistrationComponent } from './pages/isa/lists/pending-registration/pending-registration.component';
import { ExaminationRedirectComponent } from './pages/isa/examination-redirect/examination-redirect.component';
import { GoogleMap } from '@angular/google-maps';
import { GoogleMapsComponent } from './pages/isa/google-maps/google-maps.component';
import { NewClinicComponent } from './pages/isa/create-forms/new-clinic/new-clinic.component';
import { NewAdminComponent } from './pages/isa/create-forms/new-admin/new-admin.component';
import { NewMedicineComponent } from './pages/isa/create-forms/new-medicine/new-medicine.component';
import { NewDiagnosisComponent } from './pages/isa/create-forms/new-diagnosis/new-diagnosis.component';
import { MedicinesComponent } from './pages/isa/lists/medicines/medicines.component';
import { DiagnosisComponent } from './pages/isa/lists/diagnosis/diagnosis.component';
import { NewRecipeComponent } from './pages/isa/create-forms/new-recipe/new-recipe.component';
import { CertifiedRecipesComponent } from './pages/isa/lists/certified-recipes/certified-recipes.component';
import { NonCertifiedRecipesComponent } from './pages/isa/lists/non-certified-recipes/non-certified-recipes.component';
import { ClinicsIncomeComponent } from './pages/isa/lists/clinics-income/clinics-income.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
    { path: 'auth/login/:id/patient', component: LoginComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/registration', component: RegistrationComponent},
    { path: 'auth/:id/new-password', component: FirstLoginComponent},
    {
      path: 'dashboard', component: IsaComponent, children: [
        { path: 'update-password', component: UpdatePasswordComponent},

        { path: 'patients', component: PatientsComponent},
        { path: 'admins', component: AdminsComponent},
        { path: 'doctors', component: DoctorsComponent},
        { path: 'clinics', component: ClinicsComponent},
        { path: 'patients/:id/clinic', component: PatientsComponent},
        { path: 'doctors/:id/clinic', component: DoctorsComponent},
        { path: 'admins/:id/clinic', component: AdminsComponent},
        { path: 'nurses/:id/clinic', component: NursesComponent},
        { path: 'emergency-rooms/:id/clinic', component: EmergencyRoomsComponent},
        { path: 'examination-types/:id/clinic', component: ExaminationTypesComponent},
        { path: 'potential-examinations/:id/clinic', component: PotentialExaminationsComponent},
        { path: 'potential-examinations', component: PotentialExaminationsComponent},
        { path: 'pending-examinations/:id/clinic', component: PendingExaminationsComponent},
        { path: 'confirming-examinations', component: ConfirmingExaminationsComponent},
        { path: 'pending-vacations/:id/clinic', component: PendingVacationsComponent},
        { path: 'doctor-calendar', component: DoctorCalendarComponent},
        { path: 'future-examinations', component: FutureExaminationsComponent},
        { path: 'examinations-history', component: ExaminationsHistoryComponent},
        { path: 'doctors-who-can-be-graded', component: DoctorsWhoCanBeGradedComponent},
        { path: 'clinics-which-can-be-graded', component: ClinicsWhichCanBeGradedComponent},
        { path: 'pricelist', component: PricelistComponent},
        { path: 'registration-requests', component: PendingRegistrationComponent},
        { path: 'medicines', component: MedicinesComponent},
        { path: 'diagnosis', component: DiagnosisComponent},
        { path: 'nurses', component: NursesComponent},
        { path: 'certified-recipes', component: CertifiedRecipesComponent},
        { path: 'non-certified-recipes', component: NonCertifiedRecipesComponent},
        { path: 'clinics-income', component: ClinicsIncomeComponent},

        { path: 'my-profile', component: ProfileComponent},
        { path: 'profile/:id/patient', component: PatientComponent},
        { path: 'profile/:id/admin', component: AdminComponent},
        { path: 'profile/:id/doctor', component: DoctorComponent},
        { path: 'profile/:id/nurse', component: NurseComponent},
        { path: 'profile/:id/clinic', component: ClinicComponent},
        { path: 'profile/:id/examination-type', component: ExaminationTypeComponent},
        { path: 'profile/:id/emergency-room', component: EmergencyRoomComponent},

        { path: 'create-doctor', component: NewDoctorComponent},
        { path: 'create-nurse', component: NewNurseComponent},
        { path: 'create-clinic', component: NewClinicComponent},
        { path: 'create-admin', component: NewAdminComponent},
        { path: 'create-emergency-room', component: NewEmergencyRoomComponent},
        { path: 'create-examination-type', component: NewExaminationTypeComponent},
        { path: 'create-potential-examination', component: NewPotentialExaminationComponent},
        { path: 'create-vacation-request', component: NewVacationRequestComponent},
        { path: 'create-examination-request/:id/patient', component: NewExaminationByDoctorComponent},
        { path: 'create-examination-request', component: NewExaminationByPatientComponent},
        { path: 'create-medicine', component: NewMedicineComponent},
        { path: 'create-diagnosis', component: NewDiagnosisComponent},
        { path: 'create-recipe', component: NewRecipeComponent},
      
        { path: 'examination-redirect', component: ExaminationRedirectComponent},

        { path: 'google-maps', component: GoogleMapsComponent}
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
