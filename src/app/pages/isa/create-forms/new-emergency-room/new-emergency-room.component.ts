import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmergencyRoomService } from 'src/app/services/emergency-room.service';

@Component({
  selector: 'app-new-emergency-room',
  templateUrl: './new-emergency-room.component.html',
  styleUrls: ['./new-emergency-room.component.css']
})
export class NewEmergencyRoomComponent implements OnInit {

  validateForm: FormGroup

  private user: any;

  constructor(private route: ActivatedRoute, private emergencyRoomService: EmergencyRoomService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupForm();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupForm(): void {
    this.validateForm = this.fb.group({
      number: [ null, [Validators.pattern("^[0-9]*$"), Validators.required]],
      name: [ null, [Validators.required, Validators.minLength(4)]]
    });
  }

  create(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      console.log(this.validateForm.value)
      this.emergencyRoomService.createEmergencyRoom(this.validateForm.value, this.user.myClinic.id).subscribe(data => {
        
      },
      error => {
        const message = error.error.message;
        console.log(message)
      });
    }
  }

}
