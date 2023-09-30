import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  body = 'body';
  home = 'home';
  content_search = 'content_search';

  products: IProduct[] = [];

  constructor(public productService: ProductService, public router: Router) {
    this.getAllCategories()
  }

  getAllCategories(){
    return this.productService.getAllProducts().subscribe((res)=> this.products = res)
  }

  createProduct(){

  }
}
