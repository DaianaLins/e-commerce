import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { userAutenticadoGuard } from './auth/user-autenticado.guard';
import { SignupComponent } from './component/signup/signup.component';
import { CreateCategoryComponent } from './component/create-category/create-category.component';
import { CreateProductComponent } from './component/create-product/create-product.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent, canActivate: [userAutenticadoGuard] },
  { path: 'create-category', component: CreateCategoryComponent, canActivate: [userAutenticadoGuard] },
  { path: 'create-product', component: CreateProductComponent, canActivate: [userAutenticadoGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
