import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureUpdateService {

  private updateStatus = new BehaviorSubject('');
  currentUpdateStatus = this.updateStatus.asObservable();

  constructor() { }

  updateStatusText(status: string) {
    this.updateStatus.next(status)
  }
}
