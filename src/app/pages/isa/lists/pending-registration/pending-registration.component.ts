import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationRequestService } from 'src/app/services/registration-request.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pending-registration',
  templateUrl: './pending-registration.component.html',
  styleUrls: ['./pending-registration.component.css']
})
export class PendingRegistrationComponent implements OnInit {

  validateForm: FormGroup;

  public listOfData = [];
  private user: any;
  public isVisible: boolean;

  constructor(private rrService: RegistrationRequestService, private message: NzMessageService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
    this.validateForm = this.fb.group({
      message: [null, [Validators.required, Validators.minLength(13)]]
    });
  }

  private setupData(): void {
    this.rrService.getAllRegistrationRequests().subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl(`dashboard`);
    });
    this.isVisible = false;
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public confirm(id): void {
    const body = {
      patientId: id
    }
    this.rrService.confirmRegistrationRequest(body).subscribe(() => {
      this.setupData();
      this.message.info('Uspešno ste odobrili zahtev za registraciju');
    })
  }

  public geetReason(): void {
    this.isVisible = true;
  }

  public deny(id): void {
    const body = {
      ...this.validateForm.value
    }
    this.rrService.denyRegistrationRequest(id, body).subscribe(() => {
      this.setupData();
      this.message.info('Uspešno ste odbili zahtev za registraciju');
    })
  }

  public patientsDN(name, surname): String {
    return name + ' ' + surname;
  }

}
