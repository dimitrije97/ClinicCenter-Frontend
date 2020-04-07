import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  public listOfData = [];
  private id;
  private user: any;

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.extractId();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'CLINIC_CENTER_ADMIN') {
      this.adminService.getAllAdmins().subscribe(data => {
        this.listOfData = data;
      });
    } else {
      
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  profile(id) {
    this.router.navigateByUrl(`dashboard/profile/${id}/admin`);
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  delete(id) {
    this.adminService.deleteAdmin(id).subscribe(() => {
      this.setupData();
    },
    error => {
      const message = error.error.message;
      console.log(message)
    });
  }
 }

