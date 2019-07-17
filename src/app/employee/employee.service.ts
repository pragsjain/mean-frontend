import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  uri= 'http://localhost:4000';
  constructor(private http: HttpClient,private router:Router) { }

    //getAllEmployees
    getEmployees() {
      return this.http.get(`${this.uri}/employees`)
    }

    getEmployeeById(id) {
      return this.http.get(`${this.uri}/employees/${id}`)
    }

    addEmployee(employee) {

      //  let httpHeaders = new HttpHeaders({
      //   'Content-Type' : 'application/x-www-form-urlencoded'
      //      });            
      //      let options = {
      //        headers: httpHeaders
      //      };  
      //return this.http.post(`${this.uri}/employees/add`,employee)
       
      //to track file progress
         var xhr = new XMLHttpRequest();
           let self=this
          // your url upload
          xhr.open('post', `${this.uri}/employees/add`, true);

          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              var percentage = (e.loaded / e.total) * 100;
              console.log(percentage + "%");
            }
          };

          xhr.onerror = function(e) {
            console.log('Error');
            console.log(e);
          };
          xhr.onload = function() {
            console.log(this.statusText);
            self.router.navigate(['/list']);
          };

          xhr.send(employee);
        
     
    }

    updateEmployee(id,employee) {
      return this.http.post(`${this.uri}/employees/update/${id}`,employee)
    }

    deleteEmployee(id) {
      return this.http.get(`${this.uri}/employees/delete/${id}`)
    }

    uploadPic(formData) {
      return this.http.post(`${this.uri}/uploadImage`, formData)
    }

  
}
