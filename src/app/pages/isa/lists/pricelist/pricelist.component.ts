import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  public listOfData = [];

  constructor(private message: NzMessageService, private router: Router, private etService: ExaminationTypeService) { }

  ngOnInit() {
    this.setupData();
  }

  private setupData(): void {
    this.etService.getAllExaminationTypes().subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl(`dashboard`);
    });
  }

}
