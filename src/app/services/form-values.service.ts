import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FormValuesService {
  public formValue$: BehaviorSubject<object> = new BehaviorSubject(null);

  constructor() {}

  setValue(data: object): void {
    this.formValue$.next(data);
  }

  getValue$(): Observable<object> {
    return this.formValue$.asObservable();
  }
}
