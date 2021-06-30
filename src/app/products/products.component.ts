import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CommonBreadcrumbDataService } from '../services/common-breadcrumb-data.service';
import { CommonDataService } from '../services/common-data.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  breadcrumb_data:any = null;
  breadcrumb_status:boolean = false;

  products: any = [];
  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "";

  loading: boolean = true;

  error_status: boolean = false;

  category: string = "";

  data: string[] = [];

  query: string = "";

  constructor(private _serviceProduct: ProductsService, private activatedRoute: ActivatedRoute, private commonService: CommonDataService,
    private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["q"]) {
        this.query = params["q"];
        this.commonService.updateSearchText(this.query);
      }
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.category) {
        this.data.push(params.category);
      }
    });

    setTimeout(() => {
      if (this.query != "") {
        this.searchProducts(this.query);
        this._serviceProduct.setSearchText(this.query);
      } else if (this.data.length > 0) {
        this.fetchCategoryProducts(this.data);
        this.fetchBreadcrumbs(this.data[0]);
      } else {
        this._serviceProduct.setSearchText("");
        this.breadcrumb_data = null;
        this.breadcrumb_status = false;
        this.fetchProducts();
        console.log("Yes I Am Also Running")
      }
    }, 50);
    this.sortOptions = [
      { label: 'Price High to Low', value: '!sale_price' },
      { label: 'Price Low to High', value: 'sale_price' },
      { label: 'Recently Added', value: '!created_at' },
      { label: 'Most Popular', value: '!popular' }
    ];
  }

  fetchCategoryProducts(category: string[]): void {
    var formData: any = new FormData();
    for (let i = 0; i < category.length; i++) {
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

  fetchBreadcrumbs(category: string): void {
    var formData: any = new FormData();
    formData.append(`category`, category);
    this._serviceProduct.getBreadcrumbs(formData).subscribe(
      (data) => {
        this.breadcrumb_data = data;
        if(data!=null){
          this.breadcrumb_status = true;
        }else{
          this.breadcrumb_status = false;
        }
      },
      (error) => {
        this.breadcrumb_status = false;
        this.breadcrumb_data = null;
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

  searchProducts(query: string): void {
    this._serviceProduct.getSearchProducts(query).subscribe(
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


  paginate(event: any): void {
    console.log(event);
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  generateRequest(product:any):void{
    console.log(product);
    var formData: any = new FormData();
    formData.append(`id`, product.id);
    this._serviceProduct.updateCounterRequest(formData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    window.open( 
      product.link, "_blank");
  }

  genereateBreadcrumbRequest(slug: string): void {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    if(slug==''){
      this.route.navigate(['/products']);
    }else{
      this.route.navigate(['/products',slug]);
    }    
  }

  checkLast(i: number): boolean {
    return this.breadcrumb_data != null && i == this.breadcrumb_data.data.length - 1;
  }
}
