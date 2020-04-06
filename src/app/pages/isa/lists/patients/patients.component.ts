import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  public listOfData = [];
  private id;
  private user: any;

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.extractId();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'CLINIC_CENTER_ADMIN') {
      this.patientService.getAllPatients().subscribe(data => {
        this.listOfData = data;
      });
    } else {
      this.patientService.getAllPatientsByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      });
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  public profile(id): void {
    this.router.navigateByUrl(`dashboard/profile/${id}/patient`);
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }
  
  public scheduleExamination(id): void {
    this.router.navigateByUrl(`dashboard/create-examination-request/${id}/patient`);
  }

}

//  searchValue = '';
//     sortName: string | null = null;
//     sortValue: string | null = null;
    

  
//     reset(): void {
//       this.searchValue = '';
//       this.search();
//     }
  
//     sort(sortName: string, value: string): void {
//       this.sortName = sortName;
//       this.sortValue = value;
//       this.search();
//     }
  
    
  
//     search(): void {
//       const filterFunc = (item: { firstName: string; lastName: string;}) => {
//         return (
//           (this.listOfSearchAddress.length
//             ? this.listOfSearchAddress.some(lastName => item.lastName.indexOf(lastName) !== -1)
//             : true) && item.firstName.indexOf(this.searchValue) !== -1
//         );
//       };
//       const data = this.listOfData.filter((item: { firstName: string; lastName: string;}) => filterFunc(item));
//       this.listOfDisplayData = data.sort((a, b) =>
//         this.sortValue === 'ascend'
//           ? a[this.sortName!] > b[this.sortName!]
//             ? 1
//             : -1
//           : b[this.sortName!] > a[this.sortName!]
//           ? 1
//           : -1
//       );
//     }
