import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EcommerceServService } from './services/ecommerce-serv.service';

@Injectable({
  providedIn: 'root',
})
export class GestionGuard implements CanActivate {
  constructor(
    public service: EcommerceServService,
    private route: Router,
    private Location: Location
  ) {}

  canActivate(): boolean {
    if (this.service.userLogged()) {
      let role = '/' + localStorage.getItem('role');
      if (role == this.Location.path() || this.Location.path() == '/login') {
        return true;
      } else {
        localStorage.removeItem('token');
        this.route.navigate(['/']);
        return false;
      }
    }
    this.route.navigate(['/login']);
    return false;
  }
}
