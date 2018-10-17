import { Component, OnInit } from '@angular/core';
import { EmployeeService} from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  departments =[
    {id:2 ,value: 'Dep1'},
    {id:3 ,value: 'Dep2'},
    {id:2 ,value: 'Dep3'}
  ]
  constructor( public service : EmployeeService) { }

  ngOnInit() {
  }

}
