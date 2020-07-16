import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get("http://localhost:3000/products");
  }

  newProduct(item) {
    return this.http.post("http://localhost:3000/insert", {"product": item});
  }

  getProduct(id) {
    return this.http.get("http://localhost:3000/product/" + id);
  }

  editProduct(id, item) {
    return this.http.post("http://localhost:3000/product/" + id, {"editedProduct": item});
  }

  deleteProduct(id) {
    return this.http.delete("http://localhost:3000/delete/" + id);
  }

  test() {
    return this.http.get("http://localhost:3000/test")
  }
}
