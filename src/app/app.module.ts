import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { FirstLoginComponent } from './pages/auth/first-login/first-login.component';
import { IsaComponent } from './pages/isa/isa.component';
import { UpdatePasswordComponent } from './pages/isa/update-password/update-password.component';
import { PatientsComponent } from './pages/isa/lists/patients/patients.component';
import { ProfileComponent } from './pages/isa/profiles/profile/profile.component';
import { PatientComponent } from './pages/isa/profiles/patient/patient.component';
import { AdminComponent } from './pages/isa/profiles/admin/admin.component';
import { ClinicCenterAdminComponent } from './pages/isa/profiles/clinic-center-admin/clinic-center-admin.component';
import { DoctorComponent } from './pages/isa/profiles/doctor/doctor.component';
import { NurseComponent } from './pages/isa/profiles/nurse/nurse.component';
import { AdminsComponent } from './pages/isa/lists/admins/admins.component';
import { DoctorsComponent } from './pages/isa/lists/doctors/doctors.component';
import { ClinicsComponent } from './pages/isa/lists/clinics/clinics.component';
import { ClinicComponent } from './pages/isa/profiles/clinic/clinic.component';
import { EmergencyRoomsComponent } from './pages/isa/lists/emergency-rooms/emergency-rooms.component';
import { ExaminationTypesComponent } from './pages/isa/lists/examination-types/examination-types.component';
import { EmergencyRoomComponent } from './pages/isa/profiles/emergency-room/emergency-room.component';
import { ExaminationTypeComponent } from './pages/isa/profiles/examination-type/examination-type.component';
import { NewExaminationTypeComponent } from './pages/isa/create-forms/new-examination-type/new-examination-type.component';
import { NewEmergencyRoomComponent } from './pages/isa/create-forms/new-emergency-room/new-emergency-room.component';
import { NewDoctorComponent } from './pages/isa/create-forms/new-doctor/new-doctor.component';
import { NewNurseComponent } from './pages/isa/create-forms/new-nurse/new-nurse.component';
import { NursesComponent } from './pages/isa/lists/nurses/nurses.component';
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

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FirstLoginComponent,
    UpdatePasswordComponent,
    IsaComponent,
    PatientsComponent,
    ProfileComponent,
    PatientComponent,
    AdminComponent,
    ClinicCenterAdminComponent,
    DoctorComponent,
    NurseComponent,
    DoctorsComponent,
    AdminsComponent,
    ClinicsComponent,
    ClinicComponent,
    EmergencyRoomsComponent,
    ExaminationTypesComponent,
    EmergencyRoomComponent,
    ExaminationTypeComponent,
    NewExaminationTypeComponent,
    NewEmergencyRoomComponent,
    NewDoctorComponent,
    NewNurseComponent,
    NursesComponent,
    NewPotentialExaminationComponent,
    PotentialExaminationsComponent,
    PendingExaminationsComponent,
    PendingVacationsComponent,
    NewVacationRequestComponent,
    NewExaminationByDoctorComponent,
    NewExaminationByPatientComponent,
    ConfirmingExaminationsComponent,
    DoctorCalendarComponent,
    FutureExaminationsComponent,
    ExaminationsHistoryComponent,
    DoctorsWhoCanBeGradedComponent,
    ClinicsWhichCanBeGradedComponent,
    PricelistComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzIconModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' },
  { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }