import { Injectable } from "@angular/core";
import { SubjectService } from "./subject.service";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private subjectService: SubjectService) {}

  back() {
    this.subjectService.sendData({
      action: 'back'
    });
  }

  navigate(to: string, data?: any) {
    this.subjectService.sendData({
      action: 'navigate',
      to,
      data
    });
  }

  search(query: string) {
    if (!query) {
      this.navigate('line');
      return;
    }

    this.subjectService.sendData({
      action: 'search',
      data: query
    });
  }
}