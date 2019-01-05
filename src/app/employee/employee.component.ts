import { Component, OnInit } from '@angular/core';
import { EmployeeService} from '../shared/employee.service';
import { DepartmentService } from '../shared/department.service';
import { NotificationService} from '../shared/notification.service';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  constructor( private service : EmployeeService ,
     private deptService : DepartmentService,
    private Notification : NotificationService,
    public dialogRef : MatDialogRef<EmployeeComponent>) { }

  ngOnInit() {

    this.service.getEmployees();

  }

  onClear(){

    this.service.form.reset();
    this.service.initializeFormGroup();
    

  }

  onSubmit(){
    if(this.service.form.valid){
      if( !this.service.form.get('$key').value)
      this.service.insertEmployees(this.service.form.value);
      else
      this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.Notification.success(':: Successfully Inserted');
      this.onClose();

    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}