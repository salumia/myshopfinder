import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryProductComponent } from './category-product/category-product.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProductsComponent } from './products/products.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'products/:category',
    component:ProductsComponent
  },
  {
    path:'contact',
    component:ContactUsComponent
  },
  {
    path:'terms',
    component:TermsComponent
  },
  {
    path:'privacy-policy',
    component:PrivacyComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
