import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FeatureComponent } from './feature/feature.component';
import { HttpClientModule } from '@angular/common/http';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SkeletonModule} from 'primeng/skeleton';
import { ProductsComponent } from './products/products.component';
import {DataViewModule} from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import { CategoryProductComponent } from './category-product/category-product.component';
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import {SliderModule} from 'primeng/slider';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FeatureComponent,
    ProductsComponent,
    CategoryProductComponent,
    ContactUsComponent,
    TermsComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProgressSpinnerModule,
    SkeletonModule,
    DataViewModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    ListboxModule,
    SliderModule,
    InputSwitchModule,
    ScrollPanelModule,
    InputTextModule,
    MenubarModule,
    BrowserAnimationsModule
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
