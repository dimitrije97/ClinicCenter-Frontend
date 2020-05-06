import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { OperationService } from 'src/app/services/operation.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-operations-history',
  templateUrl: './operations-history.component.html',
  styleUrls: ['./operations-history.component.css']
})
export class OperationsHistoryComponent implements OnInit {

  public listOfData = [];
  private user: any;

  public name: any = '';

  constructor(private message: NzMessageService, private operationService: OperationService, private router: Router) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.operationService.getOperationsHistory(this.user.id).subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl(`dashboard`);
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  formatDate(date): String {
    return moment(date).format("L");
  }

}
