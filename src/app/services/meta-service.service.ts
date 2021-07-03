import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {

  constructor(private titleService:Title,private metaService:Meta) { }

  addTitle(title:string):void{
    this.titleService.setTitle(title);
  }

  addDescription(description:string):void{
    this.metaService.removeTag("name=description");
    this.metaService.addTag({name:"description",content:description});
  }
}
