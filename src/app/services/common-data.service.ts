import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private approvalSearchText = new BehaviorSubject('');
  currentApprovalSearchText = this.approvalSearchText.asObservable();

  constructor() { }

  updateSearchText(message: string) {
    this.approvalSearchText.next(message)
  }
}
