import { Injectable } from '@angular/core';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { AotSummaryResolver } from '../../../node_modules/@angular/compiler';

import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentFireList : AngularFireList<any>;

  array=[];

  constructor(private firebase : AngularFireDatabase) {

    this.departmentFireList = this.firebase.list('deparments');

    this.departmentFireList.snapshotChanges().subscribe(
      list =>{
        this.array = list.map( item =>{
          return{
            $key : item.key,
            ...item.payload.val()
          }
        });
      }
    );
   }

 getDepartmentName($key){
   if($key=="0")
   return "";
   else{
    return _.find(this.array, (obj) => {return obj.$key == $key; } ) ['name'];
   }
 }
}
