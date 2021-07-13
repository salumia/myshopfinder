import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MenuItem, SelectItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { CommonDataService } from '../services/common-data.service';
import { FeatureUpdateService } from '../services/feature-update.service';
import { MetaServiceService } from '../services/meta-service.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // Represent Bread Crumb Data
  breadcrumb_data: any = null;
  // Represent Bread Crumb Status means it is available or not
  breadcrumb_status: boolean = false;
  // Status of Filter Side bar is display or not
  filter_sidebar: boolean = false;

  // Represent List of Products
  products: any = [];
  // Available Sort Options
  sortOptions: SelectItem[] = [];
  // Current Sort Order 1 means Ascending and -1 means Descending
  sortOrder: number = 1;
  // Sort Field on sorting can be appliend
  sortField: string = "";
  // Sort Key decide current selected Option in Drop Down
  sortKey: string = "";
  // Status of Product Loading
  loading: boolean = true;

  category: string = "";

  data: string[] = [];

  query: string = "";

  // All Brands Available for Display in Filter Side bar
  brands: any = [];
  // All Categories Available for Display in Filter Side bar
  categories: any = [];
  // All Selected Brand in Filter Side Bar
  selectedBrand: any = [];
  // All Selected Category in Filter Side Bar
  selectedCategory: any = [];
  // Range Value for Price Slider in Filter Side bar
  rangeValues: number[] = [0, 1];
  // Selected Range Value for Price Slider in Filter Side bar
  selectedRangeValues: number[] = [0, 1];
  

  all_product_status: boolean = false;
  mobile_filter_view: boolean = false;
  filter_flag: boolean = false;
  paramRangeValues: number[] = [0, 0];
  paramBrands: string = "";
  paramCategories: string = "";

  switchChecked: boolean = true;
  currentLayout: string = "grid";
  pageNumber: number = 1;
  limits: number = environment.LIMIT_RECORD;
  totalRecords: number = environment.LIMIT_RECORD;
  sort_order: string = "asc";
  sort_column: string = "id";
  first_time: boolean = true;
  pageTitle: string = "";
  sections: string[] = ["women", "men", "kids", "home"];
  sectionsDropDown: string[] = ["Women", "Men", "Kids", "Home"];
  categoryName: string = "";
  searchText: string = "";
  maintainSearchText:boolean = false;
  searchKey: string = "Women";
  menuItems: MenuItem[] = [];

  // For Filtered Category in Sections
  sectionCategories: any[] = [];
  selectedSectionCategories: any[] = [];

  constructor(private _serviceProduct: ProductsService, private activatedRoute: ActivatedRoute, private commonService: CommonDataService,
    private route: Router, private deviceService: DeviceDetectorService, private location: Location, private metaService: MetaServiceService
    , private featureUpdateService: FeatureUpdateService) {
    this.featureUpdateService.updateStatusText("no");
    if (deviceService.isMobile()) {
      this.mobile_filter_view = true;
    } else {
      this.mobile_filter_view = false;
    }
    this.first_time = true;
    this.selectedCategory = [];
    for(let index = 0; index < this.sections.length; index++){
      this.sectionCategories[index] = [];
      this.selectedSectionCategories[index] = [];
    }
  }

  ngOnInit(): void {
    this.metaService.addTitle(environment.BASE_TITLE);
    this.metaService.addDescription(environment.BASE_DESCRIPTION);
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["q"]) {
        this.query = params["q"];
        this.commonService.updateSearchText(this.query);
      }
      if (params["s"]) {
        this.searchText = params["s"];
        if(params["q"]){
          this.query = "";
          this.commonService.updateSearchText(this.query);
        }
      }
      if (params["pageNumber"]) {
        this.pageNumber = params["pageNumber"];
      }
      if (params["mp"] && params["xp"]) {
        this.paramRangeValues[0] = params["mp"];
        this.paramRangeValues[1] = params["xp"];
        this.filter_flag = true;
      }
      if (params["fb"]) {
        this.paramBrands = params["fb"];
        this.filter_flag = true;
      }
      if (params["fc"]) {
        this.paramCategories = params["fc"];
        this.filter_flag = true;
      }
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.category) {
        this.data.push(params.category);
        let index = this.sections.indexOf(this.data[0]);
        if (index != -1) {
          this.searchKey = this.sectionsDropDown[index];
        }
      }
    });

    setTimeout(() => {
      if (this.data.length == 0) {
        console.log("Here");
        this.getFilterData('');
      } else {

        this.getFilterData(this.data[0]);
      }
    }, 50);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
      { label: 'Recently Added', value: '!created_at' },
      { label: 'Most Popular', value: '!popular' }
    ];
  }

  fetchAllDetails(): void {
    if (this.query != "") {
      this.searchProducts(this.query);
      this.commonService.updateSearchText(this.query);
      this.searchText = "";
    } else if (this.data.length > 0) {
      this.fetchBreadcrumbs(this.data[0]);
      if (this.sections.indexOf(this.data[0]) != -1 && this.searchText != "") {
        this.fetchFilterCategoryProducts(this.data, "&q=" + this.searchText);
      }
      else if (this.filter_flag) {
        this.resetFilterParameter();
        this.fetchFilterCategoryProducts(this.data, this.prepareFilterQuery());
        this.searchText = "";
      } else {
        this.fetchCategoryProducts(this.data);
        this.searchText = "";
      }
    }
    else {
      this.breadcrumb_data = null;
      this.breadcrumb_status = false;
      this.all_product_status = true;
      if (this.filter_flag) {
        this.resetFilterParameter();
        this.fetchFilterProducts(this.prepareFilterQuery());
        this.searchText = "";
      } else {
        this.fetchProducts();
        this.searchText = "";
      }
    }
  }

  resetFilterParameter(): void {
    if (this.paramRangeValues[0] != 0 && this.paramRangeValues[1] != 0) {
      this.selectedRangeValues[0] = this.paramRangeValues[0];
      this.selectedRangeValues[1] = this.paramRangeValues[1];
      this.selectedRangeValues = [this.paramRangeValues[0], this.paramRangeValues[1]]; // Unusual
    }
    if (this.paramCategories != "") {
      let values = this.paramCategories.split(",");
      this.selectedCategory = [];
      for (let value of values) {
        for (let category of this.categories) {
          let index = this.getSectionIndex(category.section);
          if (category.slug == value) {
            this.selectedCategory.push(category);
            if(index!=-1){
              this.selectedSectionCategories[index].push(category);
            }            
          }
        }
      }
    }
    if (this.paramBrands != "") {
      let values = this.paramBrands.split(",");
      this.selectedBrand = [];
      for (let value of values) {
        for (let brand of this.brands) {
          if (brand.brand == value) {
            this.selectedBrand.push(brand);
          }
        }
      }
    }
  }

  fetchBreadcrumbs(category: string): void {
    if (this.sections.indexOf(category) == -1) {
      var formData: any = new FormData();
      formData.append(`category`, category);
      this._serviceProduct.getBreadcrumbs(formData).subscribe(
        (data) => {
          this.breadcrumb_data = data;
          if (data != null) {
            this.breadcrumb_status = true;
            this.categoryName = this.breadcrumb_data.data[this.breadcrumb_data.data.length - 1].category_name;
            let index = this.sections.indexOf(this.breadcrumb_data.section);
            if (index != -1) {
              this.searchKey = this.sectionsDropDown[index];
            }
          } else {
            this.breadcrumb_status = false;
            this.categoryName = "";
          }
          this.initializePageTitle();
        },
        (error) => {
          this.breadcrumb_status = false;
          this.breadcrumb_data = null;
        }
      );
    }
  }

  fetchProducts(): void {
    let offset = (this.pageNumber - 1) * this.limits;
    this._serviceProduct.getAllProducts(offset, this.limits, this.sort_column, this.sort_order).subscribe(
      (data) => {
        this.products = data;
        this.totalRecords = this.products?.count[0]?.total;
        this.loading = false;
        this.updateMetaTags();
        this.initializePageTitle();
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }


  getFilterData(query: string): void {
    this._serviceProduct.getFilterData(query).subscribe(
      (data) => {
        // console.log(this.data);        
        if (data.status != 404) {
          this.brands = data.brand;
          this.selectedRangeValues = [data.price[0].min_price, data.price[0].max_price];
          this.rangeValues = [data.price[0].min_price, data.price[0].max_price];
          this.categories = data.category;
          for(let category of this.categories){
             let index = this.getSectionIndex(category.section);
             if(index != -1){
                this.sectionCategories[index].push(category);
             }
          }
        }
        this.fetchAllDetails();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchProducts(query: string): void {
    let offset = (this.pageNumber - 1) * this.limits;
    this._serviceProduct.getSearchProducts(query, offset, this.limits, this.sort_column, this.sort_order).subscribe(
      (data) => {
        this.products = data;
        this.totalRecords = this.products?.count[0]?.total;
        this.loading = false;
        this.updateMetaTags();
        this.initializePageTitle();
      },
      (error) => {
        console.log(error);
        this.loading = false;
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
    this.sort_column = this.sortField;
    this.sort_order = this.sortOrder == 1 ? "asc" : "desc";
    this.fetchAllDetails();
  }


  paginate(event: any): void {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  checkValue(event: any): void {
    if (event == 'List') {      
      this.currentLayout = "grid";
    } else {
      this.currentLayout = "list";
    }
  }


  // Code For Update Popular Counter of products
  generateRequest(product: any): void {
    var formData: any = new FormData();
    formData.append(`id`, product.id);
    this._serviceProduct.updateCounterRequest(formData).subscribe();
    window.open(product.link, "_blank");
  }

  // Generate Breadcrumb Request on Click of Breadcrumb Link
  genereateBreadcrumbRequest(slug: string): void {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    if (slug == '') {
      this.route.navigate(['/products']);
    } else {
      this.route.navigate(['/products', slug]);
    }
  }

  // Generate Section Request on Click of Section Link
  generateSectionRequest(section: string): void {
    this.genereateBreadcrumbRequest(section);
  }

  // Check Last Breadcrumb Link with index number
  checkLast(i: number): boolean {
    return this.breadcrumb_data != null && i == this.breadcrumb_data.data.length - 1;
  }

  // Function to Open Filter Sidebar
  openFilterSidebar(): void {
    this.filter_sidebar = true;
  }

  // Prepare Parameter of Filter Query
  prepareFilterQuery(): string {
    let query = "";
    let price_set = false;
    if (this.selectedRangeValues[0] != 0 && this.selectedRangeValues[1] != 0) {
      price_set = true;
      query += "mp=" + this.selectedRangeValues[0] + "&xp=" + this.selectedRangeValues[1];
    }
    let brand_set = false;
    if (this.selectedBrand.length > 0) {
      brand_set = true;
      if(price_set){
        query += "&fb=";  
      }else{
        query += "fb=";
      }      
      for (let i = 0; i < this.selectedBrand.length; i++) {
        query += this.selectedBrand[i].brand;
        if (i < this.selectedBrand.length - 1) {
          query += ",";
        }
      }
    }
    // console.log(this.selectedCategory);
    this.selectedCategory = [];
    for(let categories of this.selectedSectionCategories){
      for(let category of categories){
        this.selectedCategory.push(category);
      }
    }
    if (this.selectedCategory.length > 0) {
      if(brand_set || price_set){
        query += "&fc=";
      }else{
        query += "fc=";
      }
      for (let i = 0; i < this.selectedCategory.length; i++) {
        query += this.selectedCategory[i].slug;
        if (i < this.selectedCategory.length - 1) {
          query += ",";
        }
      }
    }
    return query;
  }

  submitFilter(): void {
    let filter_query = this.prepareFilterQuery();
    if (this.all_product_status || this.query != "") {
      this.first_time = true;
      this.pageNumber = 1;
      this.fetchFilterProducts(filter_query);
      this.location.replaceState('/products?' + filter_query);      
    } else {
      this.first_time = true;
      this.filter_flag = true;
      this.pageNumber = 1;
      let url_string = this.route.url;
      let path = this.location.path();
      if (url_string.indexOf("/") != -1) {
        url_string = url_string.substring(0, url_string.indexOf("/"));
      }
      if(path.indexOf("?")!=-1){
        this.location.replaceState(url_string + path.substring(0,path.indexOf("?")) + "?" + filter_query);      
      }else{
        this.location.replaceState(url_string + path + "?" + filter_query); 
      }
      this.fetchFilterCategoryProducts(this.data, filter_query);
      
    }
    this.filter_sidebar = false;
    this.searchText = "";
  }

  fetchFilterProducts(query: string) {
    let offset = (this.pageNumber - 1) * this.limits;
    this._serviceProduct.getSearchFilterProducts(query, offset, this.limits, this.sort_column, this.sort_order).subscribe(
      (data) => {
        this.products = data;
        this.totalRecords = this.products?.count[0]?.total;
        this.loading = false;
        this.updateMetaTags();
        this.initializePageTitle();
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }


  fetchCategoryProducts(category: string[]): void {
    this.loading = true;
    var formData: any = new FormData();
    for (let i = 0; i < category.length; i++) {
      formData.append(`category[${i}]`, category[i]);
    }
    let offset = (this.pageNumber - 1) * this.limits;
    this._serviceProduct.getCategoryProducts(formData, offset, this.limits, this.sort_column, this.sort_order).subscribe(
      (data) => {
        this.products = data;
        this.totalRecords = this.products?.count[0]?.total;
        this.loading = false;
        this.updateMetaTags();
        this.initializePageTitle();
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  fetchFilterCategoryProducts(category: string[], query: string): void {
    this.loading = true;
    var formData: any = new FormData();
    for (let i = 0; i < category.length; i++) {
      formData.append(`category[${i}]`, category[i]);
    }
    let offset = (this.pageNumber - 1) * this.limits;
    this._serviceProduct.getFilterCategoryProducts(formData, query, offset, this.limits, this.sort_column, this.sort_order).subscribe(
      (data) => {
        this.products = data;
        this.totalRecords = this.products?.count[0]?.total;
        this.loading = false;
        this.updateMetaTags();
        this.initializePageTitle();
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  capitalizeWords(text: string): string {
    return text.replace(/(?:^|\s)\S/g, (res) => { return res.toUpperCase(); })
  }

  updateMetaTags() {
    if (this.totalRecords > 0) {
      let category_name = "";
      if (this.data.length > 0) {
        for (let product of this.products.products) {
          if (product.slug == this.data[0]) {
            category_name = product.category_name;
            break;
          }
        }
        category_name = this.capitalizeWords(category_name);
      }
      let brand_name = "";
      if (this.selectedBrand.length == 1) {
        brand_name = this.selectedBrand[0].brand;
        brand_name = this.capitalizeWords(brand_name);
      }
      if (category_name != "" && brand_name != "") {
        let description = `Shop the top ${brand_name}'s ${category_name} and get the latest prices in one place. Get exclusive offers just for you on MyShopFinder.`;
        this.metaService.addTitle(brand_name + " " + category_name + environment.COMMON_TITLE);
        this.metaService.addDescription(description);
      }
      else if (category_name != "") {
        let description = `Shop thousands of ${category_name} from top brands. Get the latest prices, and find the hottest trending items now | MyShopFinder`;
        this.metaService.addTitle(category_name + environment.COMMON_TITLE);
        this.metaService.addDescription(description);
      }
      else if (brand_name != "") {
        let description = `Shop the top ${brand_name}'s products and get the latest prices in one place. Get exclusive offers just for you on MyShopFinder.`;
        this.metaService.addTitle(brand_name + environment.COMMON_TITLE);
        this.metaService.addDescription(description);
      }
    }
  }

  loadData(event: any) {
    // console.log("loadData: " + this.first_time);

    if (this.first_time) {
      this.first_time = false;
    } else {
      this.loading = true;
      this.pageNumber = Math.floor(event.first / this.limits) + 1;
      this.fetchAllDetails();
    }
  }

  initializePageTitle(): void {
    this.pageTitle = "All Products";
    if (this.data.length == 1) {
      if (this.sections.indexOf(this.data[0]) != -1) {
        this.pageTitle = this.capitalizeWords(this.data[0]) + " Products";
        if (this.selectedBrand.length == 1) {
          this.pageTitle = this.capitalizeWords(this.selectedBrand[0].brand) + " " + this.pageTitle;
        }
      } else {
        this.pageTitle = this.capitalizeWords(this.categoryName);
        if (this.selectedBrand.length == 1) {
          this.pageTitle = this.capitalizeWords(this.selectedBrand[0].brand) + " " + this.pageTitle;
        }
      }
    } else if (this.filter_flag) {
      if (this.selectedBrand.length == 1) {
        this.pageTitle = "All Products of " + this.capitalizeWords(this.selectedBrand[0].brand);
      } else {
        this.pageTitle = "Filtered Products";
      }
    }
  }

  searchBySection(): void {
    if (this.searchText != "") {
      console.log(this.searchKey.toLowerCase() + "\t" + this.searchText);
      this.data[0] = this.searchKey.toLowerCase();
      this.all_product_status = false;
      this.getFilterData(this.searchKey.toLowerCase());
      let url_string = this.route.url;
      if (url_string.indexOf("/") != -1) {
        url_string = url_string.substring(0, url_string.indexOf("/"));
      }
      this.location.replaceState(url_string + "/products/" + this.searchKey.toLowerCase() + "?s=" + this.searchText);
    }
  }

  getSectionIndex(sectionName:string):number{
    // console.log(typeof(sectionName));s
    if(typeof(sectionName) != "undefined" && sectionName!="" ){
      sectionName = sectionName.toLowerCase();
      return this.sections.indexOf(sectionName);
    }
    return -1;
  }

}
