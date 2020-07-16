import { Component, OnInit } from '@angular/core';
import { ProductModel } from "./product.model";
import { ProductService } from "../product.service";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: String = "Product List"
  // Product list is the model class for a product item
  products: ProductModel[]
  // Image properties
  imageWidth: number = 50;
  imageMargin: number = 2;

  showImage: boolean = false;
  // Creating service object for calling getProduct()
  constructor(private productService: ProductService,
              private _router: Router,
              private _auth: AuthService) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  
  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe(
      data => {
        this.products = JSON.parse(JSON.stringify(data));
        console.log(this.products)
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser();
          }
        }
      }
    );
  }
}
