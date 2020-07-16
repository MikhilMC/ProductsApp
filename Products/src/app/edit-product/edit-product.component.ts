import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { ProductModel } from "../product-list/product.model";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from "../auth.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title:String = "Edit Product";
  id: String;
  newProduct = this.fb.group({
    productId: ['',Validators.pattern("([0-9])+")],
    productName: [''],
    productCode: ['',Validators.pattern("[A-Z]{3}-[0-9]{1,4}")],
    releaseDate: [''],
    description: [''],
    price: ['', Validators.pattern(/^\d*([.]?\d+)?$/)],
    starRating: ['', 
      [
        Validators.pattern(/^[0-5](\.?\d+)?$/),
        Validators.min(0),
        Validators.max(5)
      ]
    ],
    imageUrl: ['', Validators.pattern('((http(s)?)?:\/\/.*\.(?:png|jpg))')]
  });

  product = new ProductModel(null,null,null,null,null,null,null,null);
  editedProduct = new ProductModel(null,null,null,null,null,null,null,null);
  constructor(private productService:ProductService,
              private actRoute: ActivatedRoute,
              private _router: Router,
              private _auth: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.actRoute.paramMap
    .subscribe((params) => {
      this.id = params.get('id');
    });

    this.productService.getProduct(this.id)
    .subscribe((data) => {
      this.product = JSON.parse(JSON.stringify(data));
      console.log(this.product);
    });
  }

  editProduct() {
    this.editedProduct = this.newProduct.value;
    this.productService.editProduct(this.id, this.editedProduct)
    .subscribe(
      res => {
        console.log(res);
        alert("Success");
        this._router.navigate(["/products"]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser()
          }
        }
      }
    )
  }

}
