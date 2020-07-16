import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from "../product.service";
import { ProductModel } from "../product-list/product.model";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from "../auth.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  title:String = "Add Product";
  newProduct = this.fb.group({
    productId: ['',
      [
        Validators.pattern("([0-9])+"),
        Validators.required
      ]
    ],
    productName: ['', Validators.required],
    productCode: ['',
      [
        Validators.pattern("[A-Z]{3}-[0-9]{1,4}"),
        Validators.required
      ]
    ],
    releaseDate: ['', Validators.required],
    description: ['', Validators.required],
    price: ['',
      [
        Validators.pattern(/^\d*([.]?\d+)?$/),
        Validators.required
      ]
    ],
    starRating: ['', 
      [
        Validators.required,
        Validators.pattern(/^[0-5](\.?\d+)?$/),
        Validators.min(0),
        Validators.max(5)
      ]
    ],
    imageUrl: ['', 
      [
        Validators.required,
        Validators.pattern('((http(s)?)?:\/\/.*\.(?:png|jpg))')
      ]
    ]
  });

  constructor(private productService: ProductService,
              private _router: Router,
              private _auth: AuthService,
              private fb: FormBuilder) { }
  productItem = new ProductModel(null,null,null,null,null,null,null,null);
  ngOnInit(): void {
    this.productService.test()
    .subscribe(
      res => console.log("success"),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser();
          }
        }
      }
    )
  }

  addProduct() {
    this.productItem = this.newProduct.value;
    this.productService.newProduct(this.productItem)
    .subscribe(
      res => {
        console.log(res);
        alert("Success");
        this._router.navigate(["/products"]);
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
