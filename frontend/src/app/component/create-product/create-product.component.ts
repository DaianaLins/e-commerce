import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICategories } from 'src/app/interfaces/Category';
import { IProduct } from 'src/app/interfaces/Product';
import { CategoryService } from 'src/app/service/category/category.service';
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
  input = 'input';
  input_header = 'input_header'
  content_select = 'content_select'

  products: IProduct[] = [];
  categories: ICategories[] = [];

  name: string = '';
  description: string = '';
  value: string = '';
  categoryData: string = '';
  quantity: string = '';
  message: string = '';
  image: string = '';
  file: File | any = [];


  constructor(public productService: ProductService, public categoryService: CategoryService, public router: Router) {
    this.getAllProducts()
    this.getAllCategories()
  }

  getAllCategories() {
    this.value.toLocaleString();
    return this.categoryService.getAllCategories().subscribe((res) => this.categories = res)
  }

  getAllProducts() {
    return this.productService.getAllProducts().subscribe((res) => this.products = res)
  }

  onFilechange(event: any) {
    this.file = event.target.files[0];

  }

  createProduct() {
    var product = { 'name': this.name, 'description': this.description, 'category': this.categoryData, 'quantity': this.quantity, 'value': this.value, 'image': this.image } as any;

    if (this.name != '', this.description != '', this.categoryData != '', this.quantity != '', this.value != '', this.image != null) {
      this.image = this.file.name;

      let formData = new FormData();
      let formData2 = new FormData();

      formData.append("file", this.file);
      formData.append("product", JSON.stringify(product as any) )


      this.productService.createProduct(formData as any).subscribe((res) => {
          const redirectUrl = 'home';
          this.router.navigate([redirectUrl]);

      },
          err => {
            alert(err.error.detail)
          });
    } else {
      this.message = 'Preencha todos os campos *'
    }
  }
}
