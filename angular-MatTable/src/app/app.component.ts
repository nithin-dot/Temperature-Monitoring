
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';


export interface ClientData {
  ID: number;
  ROLL: string;
  temperature: string;
  NAME: string;
  Date: Date;
  Time: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dataSource$: Observable<any> | undefined;
  title = 'Temperature';
  displayedColumns: string[] = [
    'ID',
    'Roll Number',
    'Name',
    'Temperature',
    'Date',
    'Time',
  ];
  dataSource = new MatTableDataSource<ClientData>();
  public Filter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  interval: any;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;


  constructor(private http:HttpClient) {}

  ngOnInit() {
    // this.dataSource$ = Observable.interval(1000)
    //   .startWith(0)
    //   .switchMap(() => this.api.getData());
    
      // this.refreshData();
      this.interval = setInterval(() => { 
        
          this.refreshData(); 
      }, 1000);
    // this._ClientDataService.getAllClientData()
    // .subscribe(data=>this.dataSource.data = data)
  }
  ngAfterContentInit(): void {
    this.dataSource.sort = this.sort;
    const sortState: Sort = { active: 'ID', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.dataSource.paginator = this.paginator;
  }

  refreshData() : void{
    this.http.get('http://10.10.110.2:3000/get')
   .subscribe(res => {
      this.dataSource.data = res as ClientData[];
    console.log(this.dataSource.data);
     })
    }

}
