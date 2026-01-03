import { Component, OnInit } from '@angular/core';
import { EcommerceServService } from 'src/app/services/ecommerce-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: EcommerceServService, public route: Router) { }

  error = false;

  ngOnInit(): void {
  }

  getRole(){
    this.service.getRole(this.service.datosUser.email).subscribe({
      next: (res) => {
        //guardar en un localstorage en un res.role
        localStorage.setItem('role', res.role);
        if(res.role == "user"){
          this.route.navigate(['user']);
        }
        if(res.role == "admin"){
          this.route.navigate(['admin']);
        }

      },
      error: (err) => console.log(err),
    });
  }

  validateLogin(){
    this.service.login(this.service.datosUser).subscribe({
      next: (res) =>{
          localStorage.setItem('token', res.token);
          this.getRole();
      },
      error: (err) =>{
        if(err.status == 401){
          this.error = true
        }
        console.log(err)
      } 
    })
  }



}
