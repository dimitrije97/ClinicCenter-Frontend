import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-isa',
  templateUrl: './isa.component.html',
  styleUrls: ['./isa.component.css']
})
export class IsaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public clearStorage(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  public onUpdatePassword(): void {
    this.router.navigateByUrl('dashboard/update-password');
  }

  public onPatients(): void {
    this.router.navigateByUrl('dashboard/patients');
  }
  
}
