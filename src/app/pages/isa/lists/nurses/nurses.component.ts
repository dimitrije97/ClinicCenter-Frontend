import { Component, OnInit } from '@angular/core';
import { NurseService } from 'src/app/services/nurse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.css']
})
export class NursesComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private message: NzMessageService, private nurseService: NurseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'ADMIN') {
      this.nurseService.getAllNursesByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      });
    } else {
      
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  profile(id) {
    this.router.navigateByUrl(`dashboard/profile/${id}/nurse`);
  }

  delete(id) {
    this.nurseService.deleteNurse(id).subscribe(() => {
      this.setupData();
      this.message.info('Uspešno ste obrisali medicinsku sestru.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

}
