import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonBreadcrumbDataService {

  private approvalBreadcrumb = new BehaviorSubject(null);
  currentApprovalBreadcrumb = this.approvalBreadcrumb.asObservable();

  constructor() { }

  updateBreadcrumb(data:any) {
    this.approvalBreadcrumb.next(data);
  }
}
