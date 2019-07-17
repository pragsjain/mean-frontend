import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDatepickerModule } from '@angular/material';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:String;
  employee:Employee;
  EmployeePhoto;
  selectedFile: File = null;
  imageEdited=false;
  //serializedDate = new FormControl((new Date()).toISOString());
  updateForm: FormGroup;
  skillsList :String[] = ['Node Js', 'MongoDb', 'Java', 'PHP', 'HTML', 'Javascript','Angular','Css', 'C', 'Node'];
  EmployeeEditedPhoto: any;
  constructor(private employeeService : EmployeeService, 
     private fb:FormBuilder,
     private router:Router, 
     private route: ActivatedRoute,
     private snackBar:MatSnackBar
    ) { 
       this.createForm();
      }

  createForm(){
    this.updateForm = this.fb.group({
      name:['',Validators.required],
      gender:['',Validators.required],
      skills:[[],Validators.required],
      salary:[0,Validators.required],
      position:['',Validators.required],
      dob:['',Validators.required],
      experience:['',Validators.required],
     })
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id=params.id;
      this.employeeService.getEmployeeById(this.id).subscribe( (res:Employee) =>{
        console.log(res);
        this.employee = res;
        let photo=this.employee.photo+'';
        if (photo.indexOf('http')==-1) {
          this.EmployeePhoto = 'http://localhost:4000/'+this.employee.photo;
        }
        else
        this.EmployeePhoto = this.employee.photo;
        //console.log(this.employee);
        this.updateForm.get('name').setValue(this.employee.name);
        this.updateForm.get('gender').setValue(this.employee.gender);
        this.updateForm.get('skills').setValue(this.employee.skills);
        this.updateForm.get('salary').setValue(this.employee.salary);
        this.updateForm.get('position').setValue(this.employee.position);
        this.updateForm.get('experience').setValue(this.employee.experience);
        this.updateForm.get('dob').setValue(this.employee.dob);
      })
    })
  }

  updateEmployee(){
    console.log(this.updateForm.value);
    var formData = new FormData();
      formData.append('name',this.updateForm.value.name)
      formData.append('gender',this.updateForm.value.gender)
      formData.append('experience',this.updateForm.value.experience)
      formData.append('position',this.updateForm.value.position)
      formData.append('dob',this.updateForm.value.dob)
      formData.append('skills',this.updateForm.value.skills)
      formData.append('salary',this.updateForm.value.salary)
      if(this.selectedFile)
      formData.append('photo',this.selectedFile, this.selectedFile.name);
      
      var options = { content: formData };
    this.employeeService.updateEmployee(this.id,formData).subscribe(res =>{
      this.snackBar.open('Emloyee Data is updated Successfuly', 'OK',
      {duration: 3000})
      this.router.navigate(['/list']);
      //this.router.navigate(['/list']);
    })
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
    // this.createForm.patchValue({
    //   photo: this.selectedFile 
    // });
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.employeeService.uploadPic(fd)
    .subscribe(event=>{
      console.log(event);
      if (event['image'].indexOf('http')==-1) {
        this.imageEdited=true;
      this.EmployeeEditedPhoto ='http://localhost:4000/'+event['image']
      }
      // if (event['type'] === HttpEventType.UploadProgress) {
      //   console.log('Upload Progress:' + Math.round(event['loaded ']/event['total'] *100))
      // }
      // else if (event['type'] === HttpEventType.Response){
      //   console.log(event);
      // }
    })
  }

  restoreImage(){
    this.imageEdited=false
  }
  
}
