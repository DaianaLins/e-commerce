import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IUserReturn } from '../../interfaces/Login';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  body = 'body';
  home = 'home';
  layout_grid = 'layout_grid';
  card = 'card';
  title = 'title';
  quantity = 'quantity';
  value = 'value';
  desc = 'desc';
  dolar: string = '';
  convert: number = 0;
  products: IProduct[] = [];
  quant: string = '';
  status: string = '';

  constructor(public productService: ProductService, public router: Router) {
    this.getAllProducts()
    this.getDollar()
  }

  getDollar(){
    this.productService.getDolar().subscribe((res)=> {
      this.dolar = res['USDBRL'].high
    })

  }

  getStatus(p: string){
    if(Number(p) < Number(this.quant)) this.status = 'red'
    else if((Number(p) - Number(this.quant) ) <= 5) this.status='yellow'
    else this.status = 'green'
    console.log(this.status)
  }

  getAllProducts(){
    return this.productService.getAllProducts().subscribe((res)=> {
      this.products = res

      res.map((item)=>{
        this.getStatus(item.quantity)
         item.convert = Number(item.value ) * Number(this.dolar.substr(0, 2));
         item.status = this.status
      })
    })
  }
  truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };


}
