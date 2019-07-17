import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employees : Employee[];
  displayedColumns = ['name' ,'gender','skills','position','experience' ,'dob', 'actions']
  constructor(private employeeService : EmployeeService ,private router: Router) { }

  ngOnInit() {
    this.getEmployees()
  }
  
  getEmployees(){
    this.employeeService.getEmployees().subscribe((res:any[]) => {
      res.forEach(element => {
        if (element.photo.indexOf('http')==-1)
        element.photo ='http://localhost:4000/'+element.photo
      });
      this.employees= res;
       console.log(res)
    });
  }

  editEmployee(id){
    this.router.navigate([`/edit/${id}`])
  }

  deleteEmployee(id){
    this.employeeService.deleteEmployee(id).subscribe(() => {
     this.getEmployees()
    });
  }



}
