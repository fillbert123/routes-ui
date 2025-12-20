import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor() { }

  private dataSource = new BehaviorSubject<any | null>(null);
  data$ = this.dataSource.asObservable();

  sendData(value: any) {
    this.dataSource.next(value);
  }
}
