import { Component, OnInit } from '@angular/core';
import { EcommerceServService } from 'src/app/services/ecommerce-serv.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(public service: EcommerceServService, private route: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    });
   }

  ngOnInit(): void {
  }

  userList(){
    this.service.getUsers().subscribe({
      next: (res) => {
        this.service.Users = res
      },
      error: (err) => console.log(err),
    });
  }

  addUsers(form: any){
    this.service.registerUser(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.route.navigate(['/user']);
        this.userList();
        form.reset();

      },
      error: (err) => console.log(err),
    })
  }
  getUser(formulario: any) {
    console.log(formulario.value);
  }
}
