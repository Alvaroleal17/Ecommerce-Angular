import { Component, OnInit } from '@angular/core';
import { EcommerceServService } from 'src/app/services/ecommerce-serv.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Purchase_model } from 'src/app/models/purchases';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    public productServ: EcommerceServService,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productDetail();
  }

  id_url = this.ruta.snapshot.params['id'];
  prod = {};

  productDetail() {
    this.productServ.productDetail(this.id_url).subscribe({
      next: (res) => {
        this.productServ.datosProd = res;
      },
      error: (err) => console.log(err),
    });
  }

  addProduct(form: NgForm) {
    const dataCompra: Purchase_model = {
    id_producto: this.productServ.datosProd._id!, 
    name_product: this.productServ.datosProd.article,
    unit_price: this.productServ.datosProd.price,
    amount: form.value.amount || 1,
    total: (this.productServ.datosProd.price) * (form.value.amount || 1),
    date: new Date().toISOString() 
    };

    this.productServ.insertPurchase(dataCompra).subscribe({
      next: (res) => {
        this.productDetail();
        form.reset({amount: 1});
      },
      error: (err) => console.log(err),
    });
  }
}
