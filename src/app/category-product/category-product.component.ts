import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {

  products: any = [];
  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "";

  loading:boolean = true;

  constructor(private _serviceProduct: ProductsService) { }

  ngOnInit(): void {
    this._serviceProduct.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
      }
    );
    this.sortOptions = [
      { label: 'Price High to Low', value: '!sale_price' },
      { label: 'Price Low to High', value: 'sale_price' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
