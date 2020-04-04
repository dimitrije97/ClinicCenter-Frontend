import { Component, OnInit } from '@angular/core';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-examination-types',
  templateUrl: './examination-types.component.html',
  styleUrls: ['./examination-types.component.css']
})
export class ExaminationTypesComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private examinationTypeService: ExaminationTypeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'ADMIN') {
      this.examinationTypeService.getAllExaminationTypesByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      });
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  update(id) {
    this.router.navigateByUrl(`dashboard/profile/${id}/examination-type`);
  }

  delete(id) {
    this.examinationTypeService.deleteExaminationType(id).subscribe(() => {
      this.setupData();
    })
  }

}
