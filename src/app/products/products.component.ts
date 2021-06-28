import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  loading: boolean = true;

  error_status:boolean = false;

  category:string = "";

  data:string[] = [];

  constructor(private _serviceProduct: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.category){
        this.data.push(params.category);
        this.fetchCategoryProducts(this.data);
      }else{
        this.fetchProducts();
      }      
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!sale_price' },
      { label: 'Price Low to High', value: 'sale_price' }
    ];
  }

  fetchCategoryProducts(category:string[]): void {
    var formData: any = new FormData();
    for(let i = 0; i < category.length; i++){
      formData.append(`category[${i}]`, category[i]);
    }
    
    this._serviceProduct.getCategoryProducts(formData).subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.error_status = true;
      }
    );
  }

  fetchProducts(): void {
    this._serviceProduct.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.error_status = true;
      }
    );
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
