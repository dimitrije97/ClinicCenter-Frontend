import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public submitForm(): void {

  }

    searchValue = '';
    sortName: string | null = null;
    sortValue: string | null = null;
    listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
    listOfSearchAddress: string[] = [];
    listOfData: Array<{ firstName: string; lastName: string; [key: string]: string}> = [
      {
        firstName: 'John',
        lastName: 'Brown'
      },
      {
        firstName: 'Jim',
        lastName: 'Green'
      },
      {
        firstName: 'Joe',
        lastName: 'Black'
      },
      {
        firstName: 'Jim',
        lastName: 'Red'
      }
    ];
    listOfDisplayData = [...this.listOfData];
  
    reset(): void {
      this.searchValue = '';
      this.search();
    }
  
    sort(sortName: string, value: string): void {
      this.sortName = sortName;
      this.sortValue = value;
      this.search();
    }
  
    filterAddressChange(value: string[]): void {
      this.listOfSearchAddress = value;
      this.search();
    }
  
    search(): void {
      const filterFunc = (item: { firstName: string; lastName: string;}) => {
        return (
          (this.listOfSearchAddress.length
            ? this.listOfSearchAddress.some(lastName => item.lastName.indexOf(lastName) !== -1)
            : true) && item.firstName.indexOf(this.searchValue) !== -1
        );
      };
      const data = this.listOfData.filter((item: { firstName: string; lastName: string;}) => filterFunc(item));
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    }
  }


