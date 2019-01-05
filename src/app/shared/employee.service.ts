import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators} from '@angular/forms';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( public firebase : AngularFireDatabase ,private datePipe: DatePipe) { }

  fireList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl( null ), //null= default value
    fullname : new FormControl('',Validators.required),
    email : new FormControl('', Validators.email),
    mobile : new FormControl('', [Validators.required,Validators.minLength(8)]),
    city : new FormControl(''),
    gender : new FormControl('1'),
    department : new FormControl(0),
    hireDate : new FormControl(''),
    isPermanent : new FormControl(false)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key:null,
      fullname:'',
      email:'',
      mobile:'',
      city:'',
      gender:1,
      department:0,
      hireDate:'',
      isPermanent:'false'
    })
  }

  getEmployees(){
    this.fireList = this.firebase.list('employee');
    return this.fireList.snapshotChanges();
  }

  insertEmployees(employee){
    this.fireList.push({
      fullname: employee.fullname,
      email: employee.email,
      mobile : employee.mobile,
      city: employee.city,
      gender : employee.gender,
      department : employee.department,
      hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent : employee.isPermanent
    });
  }

  updateEmployee(employee){
    this.fireList.update(employee.$key,{
      fullname: employee.fullname,
      email: employee.email,
      mobile : employee.mobile,
      city: employee.city,
      gender : employee.gender,
      department : employee.department,
      hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent : employee.isPermanent
    })
  }

  deleteEmployee($key :string){
    this.fireList.remove($key);
  }

  populateForm(employee){
    console.log(employee);
    this.form.setValue( _.omit(employee, 'departmentName'));
  }

}
