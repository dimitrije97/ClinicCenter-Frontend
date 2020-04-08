import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmergencyRoomService } from 'src/app/services/emergency-room.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-emergency-room',
  templateUrl: './emergency-room.component.html',
  styleUrls: ['./emergency-room.component.css']
})
export class EmergencyRoomComponent implements OnInit {

  validateForm: FormGroup

  public isReadOnly: boolean;

  private id: string;
  private user: any;

  constructor(private message: NzMessageService, private route: ActivatedRoute, private emergencyRoomService: EmergencyRoomService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupForm();
    this.extractId();
    this.getDetails();
    this.setupIsReadOnly();
  }

  private setupIsReadOnly(): void {
    if(this.user.userType === 'ADMIN'){
      this.isReadOnly = false;
    }else{
      this.isReadOnly = true;
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupForm(): void {
    this.validateForm = this.fb.group({
      number: [ {value: null, disabled: this.isReadOnly }, [Validators.pattern("^[0-9]*$"), Validators.required]],
      name: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]]
    });
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  public getDetails(): void {
    this.emergencyRoomService.getEmergencyRoom(this.id).subscribe(data =>{
      const formValues = {
        number: data.number,
        name: data.name
      }
      this.validateForm.setValue(formValues);
    })
  }

  public update(): void {
    this.emergencyRoomService.updateEmergencyRoom(this.id, this.validateForm.value).subscribe(data => {
      this.message.info('Uspešno ste izmenili podatke.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

}
