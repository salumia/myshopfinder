import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
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

  breadcrumb_data: any = null;
  breadcrumb_status: boolean = false;
  filter_sidebar: boolean = false;

  products: any = [];
  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = "";

  sortKey: string = "";

  loading: boolean = true;

  error_status: boolean = false;

  category: string = "";

  data: string[] = [];

  query: string = "";

  brands: any = [];
  categories: any = [];
  selectedBrand: any = [];
  selectedCategory:any = [];
  rangeValues: number[] = [0,100];
  selectedRangeValues: number[]= [0,100];
  backgroud_status:boolean = false;
  all_product_status:boolean = false;
  mobile_filter_view:boolean = false;

  switchChecked:boolean = true;
  currentLayout:string="grid";

  constructor(private _serviceProduct: ProductsService, private activatedRoute: ActivatedRoute, private commonService: CommonDataService,
    private route: Router,private deviceService:DeviceDetectorService) {
    if(deviceService.isMobile()){
      this.mobile_filter_view = true;
    }else{
      this.mobile_filter_view = false;
    }
  }

  ngOnInit(): void {
    // this.brands.push("Nike");
    // this.brands.push("Adidas");
    // this.brands.push("Puma");
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
        this.commonService.updateSearchText(this.query);
      } else if (this.data.length > 0) {
        this.fetchCategoryProducts(this.data);
        this.fetchBreadcrumbs(this.data[0]);
      } else {
        this.breadcrumb_data = null;
        this.breadcrumb_status = false;
        this.all_product_status = true;
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
        if (data != null) {
          this.breadcrumb_status = true;
        } else {
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
        this.getFilterData();
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.error_status = true;
      }
    );
  }


  getFilterData():void{
    this._serviceProduct.getFilterData().subscribe(
      (data) => {
        this.brands = data.brand;
        this.selectedRangeValues[0] = data.price[0].min_price;
        this.selectedRangeValues[1] = data.price[0].max_price;
        this.rangeValues[0] = data.price[0].min_price;
        this.rangeValues[1] = data.price[0].max_price;
        this.categories = data.category;
      },
      (error) => {
        console.log(error);        
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
    this.sortKey = event.value;

    if (this.sortKey.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = this.sortKey.substring(1, this.sortKey.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = this.sortKey;
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

  changeLayout(event:any):void{
    
    if(event.layout == 'list'){
      this.backgroud_status = true;
    }else{
      this.backgroud_status = false;
    }
  }

  checkValue(event:any):void{
    console.log(event);
    if(event == 'List'){
      this.backgroud_status = false;
      this.currentLayout = "grid";
    }else{
      this.backgroud_status = true;
      this.currentLayout = "list";
    }
  }

  generateRequest(product: any): void {
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
    if (slug == '') {
      this.route.navigate(['/products']);
    } else {
      this.route.navigate(['/products', slug]);
    }
  }

  checkLast(i: number): boolean {
    return this.breadcrumb_data != null && i == this.breadcrumb_data.data.length - 1;
  }

  openFilterSidebar(): void {
    this.filter_sidebar = true;
  }

  submitFilter(): void {
    console.log(this.rangeValues);
    for(let item of this.selectedBrand){
      console.log(item.brand);
    }
    console.log(this.selectedCategory);
  }

}
