import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators} from '@angular/forms'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  form : FormGroup = new FormGroup({

    $key : new FormControl( null ), //null= default value
    fullname : new FormControl('',Validators.required),
    email : new FormControl('', Validators.email),
    mobile : new FormControl('', [Validators.required,Validators.minLength(8)]),
    city : new FormControl(''),
    gender : new FormControl('1'),
    department : new FormControl(0),
    hiredate : new FormControl(''),
    isPermanent : new FormControl(false)
  });
}
