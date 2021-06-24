import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  

  products: any = [];
  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "";

  constructor(private _serviceProduct: ProductsService) { }

  ngOnInit(): void {
    this._serviceProduct.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
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
