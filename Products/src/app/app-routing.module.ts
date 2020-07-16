import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component"
import { NewProductComponent } from "./new-product/new-product.component";
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from "./auth.guard";
import { DeleteComponent } from './delete/delete.component';


const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "products", component: ProductListComponent, canActivate: [AuthGuard] },
  { path: "add", component: NewProductComponent, canActivate: [AuthGuard] },
  { path: "product/:id", component: EditProductComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "delete/:id", component: DeleteComponent, pathMatch: "full", canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
