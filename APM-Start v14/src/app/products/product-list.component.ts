import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductParameterService } from './product-parameter.service';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  //listFilter = ''; we can't define a property with the declaration AND a getter and setter 
  includeDetail = true;
  @ViewChild(CriteriaComponent)
  filterComponent!: CriteriaComponent;
  parentListFilter = '';

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];


  get showImage(): boolean{
    return this.productParameterService.showImage;
  }
  set showImage(value:boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(private productService: ProductService,
              private productParameterService: ProductParameterService) { }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filterComponent.listFilter = 
          this.productParameterService.filteredBy
        //this.performFilter(this.parentListFilter);
      },
      error: err => this.errorMessage = err
    });
  }
  // onFilterChange(filter: string): void {
  //   this.listFilter = filter;
  //   this.performFilter(this.listFilter)
  // }

  onValueChange(value: string): void {
    this.productParameterService.filteredBy = value;
    this.performFilter(value)
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
