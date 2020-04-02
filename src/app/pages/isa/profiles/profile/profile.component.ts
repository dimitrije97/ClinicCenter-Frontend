import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

public type: any;

  constructor() { }

  ngOnInit(): void {
    this.getType();
  }

  private getType(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.type = user.userType;
  }

}
