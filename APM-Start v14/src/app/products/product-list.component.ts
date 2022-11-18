import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

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

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filterName= ''

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;
  @ViewChildren ('filterName, nameElement')
  inputElementRefs: QueryList<ElementRef> | undefined

  private _listFilter = ''
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
      this._listFilter = value;
      this.performFilter(this.listFilter)
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngAfterViewInit(): void {
    this.filterElementRef?.nativeElement.focus()
    console.log(this.inputElementRefs)
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }
  onFilterChange(filter: string): void {
    this.listFilter = filter;
    this.performFilter(this.listFilter)
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
