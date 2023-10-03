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
  input = 'input';
  input_header = 'input_header';
  container = 'container';
  content_button = 'content_button';
  container_cat= 'container_cat';
  button = 'button';
  content_card = 'content_card';

  categories: ICategories[] = [];
  showCategories: boolean = true
  name: string = '';
  description: string = ''
  showButtons: boolean = false;
  categoryId: string = '';
  message: string = '';
  msg = 'msg'


  constructor(public categoryService: CategoryService, public router: Router) {
    this.getAllCategories()
  }

  changeShowCategories(){
    this.showCategories = !this.showCategories
  }

  getAllCategories(){
    return this.categoryService.getAllCategories().subscribe((res)=> this.categories = res)
  }

  handleClick(category:ICategories){
    this.categories.map((item)=>{
      if(category.id === item.id) {
        this.categoryId = item.id
        this.showButtons = !this.showButtons
      }
    })
  }

  handleEdit(category: ICategories){
    this.name = category.name;
    this.description = category.description;
    this.showCategories = !this.showCategories;

    if(this.name != '' && this.description != ''){
      var category = {'name': this.name, 'description': this.description} as ICategories;
      this.categoryService.editCategory(category).then((res) => {
        res.pipe().subscribe((res)=>{
          this.showCategories = true
          this.getAllCategories()

        },
        err =>{
          alert(err.error.detail)
        } )
      });
    } else{
      this.message = 'Preencha todos os campos*'
    }
  }

  handleDelete(id: string){
      this.categoryService.deleteCategory(id).subscribe((res) => {

          this.showCategories = true
          this.getAllCategories()


      },
      err =>{
        alert(err.error.detail)
      } );
  }

  createCategory(){
    if(this.name != '' && this.description != ''){
      var category = {'name': this.name, 'description': this.description} as ICategories;
      this.categoryService.createCategory(category).then((res) => {
        res.pipe().subscribe((res)=>{
          this.showCategories = true
          this.name = '';
          this.description= '';
          this.getAllCategories()

        },
        err =>{
          alert(err.error.detail)
        } )
      });
    } else{
      this.message = 'Preencha todos os campos*'
    }
  }
}
