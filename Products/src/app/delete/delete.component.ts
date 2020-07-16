import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductModel } from '../product-list/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  title: String = "Delete Product";
  id: String;
  product = new ProductModel(null,null,null,null,null,null,null,null);
  constructor(private productService:ProductService,
              private actRoute: ActivatedRoute,
              private _router: Router,
              private _auth: AuthService) { }


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

  gotoProducts() {
    this._router.navigate(['/products']);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
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
