import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  selectedFile: File = null;
  isPhotoUploaded:boolean=false;
  skillsList :String[] = ['Node Js', 'MongoDb', 'Java', 'PHP', 'HTML', 'Javascript','Angular','Css', 'C', 'Node'];
  constructor(private employeeService : EmployeeService , private fb: FormBuilder, private router:Router) { 
    
     this.createForm = this.fb.group({
      name:['',Validators.required],
      gender:['',Validators.required],
      skills:[[],Validators.required],
      salary:[0,Validators.required],
      position:['',Validators.required],
      dob:['',Validators.required],
      experience:['',Validators.required],
      photo:File
     })
    }
    name: String;
    dob: String;
    experience: String;
    position: String;
    gender: String;
    salary: Number;
    skills: String[];
    photo: File;
  addEmployee(){
    console.log(this.createForm.value)
     let employee=this.createForm.value;
     var formData = new FormData();

      if(this.createForm.value.name)
      formData.append('name',this.createForm.value.name)
      if(this.createForm.value.gender)
      formData.append('gender',this.createForm.value.gender)
      if(this.createForm.value.experience)
      formData.append('experience',this.createForm.value.experience)
      if(this.createForm.value.position)
      formData.append('position',this.createForm.value.position)
      if(this.createForm.value.dob)
      formData.append('dob',this.createForm.value.dob)
      if(this.createForm.value.skills)
      formData.append('skills',this.createForm.value.skills)
      if(this.createForm.value.salary)
      formData.append('salary',this.createForm.value.salary)
      if(this.selectedFile && this.isPhotoUploaded)
      formData.append('photo',this.selectedFile, this.selectedFile.name);
     
      
      var options = { content: formData };
      //console.log(formData);
    this.employeeService.addEmployee(formData)
  }

  onFileSelected(event) {
    this.isPhotoUploaded=true;
    this.selectedFile = <File>event.target.files[0];
    // this.createForm.patchValue({
    //   photo: this.selectedFile 
    // });
  }

  // onUpload(id) {
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  //   this.employeeService.uploadPic(id,fd)
  //   .subscribe(event =>{
  //     console.log(event);
  //     if (event['type'] === HttpEventType.UploadProgress) {
  //       console.log('Upload Progress:' + Math.round(event['loaded ']/event['total'] *100))
  //     }
  //     else if (event['type'] === HttpEventType.Response){
  //       console.log(event);
  //     }
  //   })
  // }

  ngOnInit() {
  }

}
