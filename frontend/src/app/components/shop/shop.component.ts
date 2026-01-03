import { Component, OnInit } from '@angular/core';
import { EcommerceServService } from 'src/app/services/ecommerce-serv.service';
import { Purchase_model } from 'src/app/models/purchases';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(public productServ: EcommerceServService) {}

  ngOnInit(): void {
    this.productList();
  }

  total_compra = 0;

  productList() {
    this.productServ.getPurchases().subscribe({
      next: (res) => {
        this.total_compra = 0;

        this.productServ.documents = res;
        for (let i = 0; i < res.length; i++) {
          this.total_compra = this.total_compra + res[i].total;
        }
      },
      error: (err) => console.log(err),
    });
  }

  deleteProduct(id: any) {
    let confirmacion = confirm('You want to delete the product');
    console.log(confirmacion);
    if (confirmacion == true) {
      this.productServ.deleteProduct(id).subscribe({
        next: (res) => {
          this.productList();
        },
        error: (err) => console.log(err),
      });
    }
  }
}
