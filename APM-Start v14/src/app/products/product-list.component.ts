import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  //listFilter = ''; we can't define a property with the declaration AND a getter and setter 
  showImage = false;
  includeDetail = true;
  @ViewChild(CriteriaComponent)
  filterComponent!: CriteriaComponent;
  parentListFilter = '';

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];


  // private _listFilter = ''
  // get listFilter(): string {
  //   return this._listFilter;
  // }

  // set listFilter(value: string) {
  //     this._listFilter = value;
  //     this.performFilter(this.listFilter)
  // }


  constructor(private productService: ProductService) { }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.performFilter(this.parentListFilter);
      },
      error: err => this.errorMessage = err
    });
  }
  // onFilterChange(filter: string): void {
  //   this.listFilter = filter;
  //   this.performFilter(this.listFilter)
  // }
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
