import { Component, OnInit } from '@angular/core';
import { EcommerceServService } from 'src/app/services/ecommerce-serv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public productServ: EcommerceServService,
    private ruta: ActivatedRoute
  ) {}

  category = this.ruta.snapshot.params['cat'];

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
    this.category = params['cat'];
    if (this.category) {
      this.getCategory();
    } else {
      this.productList();
    }
  });
}
  productList() {
    this.productServ.getProducts().subscribe({
      next: (res) => {
        this.productServ.documentos = res;
      },
      error: (err) => console.log(err),
    });
  }

  getCategory() {
    this.productServ.getCategory(this.category).subscribe({
      next: (res) => {
        this.productServ.documentos = res;
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }
}
