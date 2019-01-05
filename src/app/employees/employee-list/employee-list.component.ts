import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { MatTableDataSource ,MatSort ,MatPaginator} from '@angular/material';
import { DepartmentService } from '../../shared/department.service';
import { MatDialog,MatDialogConfig } from '@angular/material';
import { EmployeeComponent } from '../../employee/employee.component';
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service : EmployeeService ,
    private deptService : DepartmentService,
    private dialog : MatDialog,
    private Notification : NotificationService,
    private dialogServie : DialogService  ) { }

  listData : MatTableDataSource<any>;

  displayColumns : string[] = ['fullName','email', 'mobile' ,'city', 'departmentName','actions'];

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  searchKey :string;

  ngOnInit() {
    this.service.getEmployees().subscribe( list =>{
      let array = list.map(item =>{
        let departmentName = this.deptService.getDepartmentName( item.payload.val()['department']);
        return {
          $key : item.key,
          departmentName : departmentName,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort= this.sort;
      this.listData.paginator =this.paginator;
    });
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true,
    dialogConfig.autoFocus=true,
    dialogConfig.width="60%"
    this.dialog.open(EmployeeComponent , dialogConfig);
    
  }

  onEdit(row){
   this.service.populateForm(row);
   console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true,
    dialogConfig.autoFocus=true,
    dialogConfig.width="60%"
    this.dialog.open(EmployeeComponent , dialogConfig);
  }
  onDelete($key){
   if(confirm('Are you sure to delete this record ?'))
    {
      this.service.deleteEmployee($key);
      this.Notification.warn(':: Deleted Successfully'); 
    }
    

   // this.dialogServie.openConfirmDialogBox();
  }
  
}
