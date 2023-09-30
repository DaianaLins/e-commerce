import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category/category.service';
import { ICategories } from 'src/app/interfaces/Category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  body = 'body';
  home = 'home';
  content_search = 'content_search';

  categories: ICategories[] = [];

  constructor(public categoryService: CategoryService, public router: Router) {
    this.getAllCategories()
  }

  getAllCategories(){
    return this.categoryService.getAllCategories().subscribe((res)=> this.categories = res)
  }

  createCategory(){

  }
}
