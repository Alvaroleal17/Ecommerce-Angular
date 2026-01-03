import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { EcommerceServService } from './ecommerce-serv.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private service: EcommerceServService) { }

  intercept(req: any, next: any) {
    let tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.service.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
