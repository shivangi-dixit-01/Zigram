import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isShowSpinner = false;

  public showSpinner(): void {
    this.isShowSpinner = true;
    setTimeout(() => {
      this.isShowSpinner = false;
    }, 2500);
  }
}
