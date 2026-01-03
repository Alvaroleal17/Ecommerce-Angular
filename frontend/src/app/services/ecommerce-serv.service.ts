import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product_model } from '../models/products';
import { Purchase_model } from '../models/purchases';
import { Router } from '@angular/router';
import { Users_model } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class EcommerceServService {

  constructor(private http: HttpClient, public route: Router ) { }

  URL_API = 'http://localhost:4000';

  documents: Purchase_model[] = [];

  datosCompr: Purchase_model = {
    id_producto: "",
    name_product: "",
    unit_price: 0,
    amount: 1,
    total: 0,
    date: "",
  }

  documentos: Product_model[] = [];

  datosProd: Product_model = {
    article: '',
    description: '',
    url_img: '',
    price: 0,
    category: '',
    stock: 1,
  }
  
  Users: Users_model[] = [];

  datosUser: Users_model = {
    name: "",
    email: "",
    password: "",
    role: "",
  }
  
  //Products
  getProducts(){
    let peticion  = this.http.get<Product_model[]>(this.URL_API + '/products')
    return peticion;
  }

  //Detail product
  productDetail(id: String) {
    let peticion = this.http.get<Product_model>(this.URL_API + '/product/' + id);
    return peticion;
  }
  
  //Purchases
  getPurchases() {
    let peticion = this.http.get<Purchase_model[]>(this.URL_API + '/shop_basket');
    return peticion;
  }

  //Categories
  getCategory(category: string){
    let peticion = this.http.get<Product_model[]>(this.URL_API + '/category/' + category);
    return peticion;
  }

  //Insert product to shopping cart
  insertPurchase(data: Purchase_model) {
    let peticion = this.http.post(this.URL_API + '/insert_purchase', data);
    return peticion;
    }
  
  //Delete product
  deleteProduct(id: string) {
    let peticion = this.http.delete(this.URL_API + '/delete_product/' + id);
    return peticion;
    }
  
  /*------------------ Loggin -----------------*/

  getUsers(){
    let peticion  = this.http.get<Users_model[]>(this.URL_API + '/users')
    return peticion;
  }

  registerUser(data: Users_model){
    let peticion = this.http.post<any>(this.URL_API + '/register', data);
    return peticion
  }

  login(data: Users_model){
    let peticion = this.http.post<any>(this.URL_API + '/login', data);
    return peticion
  }

  getRole(email: string) {
    let peticion = this.http.get<any>(this.URL_API + '/role/' + email);
    return peticion;
    }

  // Get Token
  getToken(){
    return localStorage.getItem('token');
  }

  //User Logged in
  userLogged(){
    return !!localStorage.getItem("token")
  }

  //Log out
  logOut(){
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
