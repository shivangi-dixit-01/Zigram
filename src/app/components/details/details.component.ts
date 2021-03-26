import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { Cocktail } from 'src/app/interfaces/cocktail';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailDrinkName: string;
  public detailRecord$: Observable<Array<Cocktail>>;

  constructor(private networks: NetworkService,
    @Inject(MAT_DIALOG_DATA) private readonly injectobj: object
  ) { }
  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.detailDrinkName = this.injectobj['drinkname'];
    this.detailRecord$ = this.networks.geteachitemItems$(this.detailDrinkName);
  }
}
