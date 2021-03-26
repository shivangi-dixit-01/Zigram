import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FilterItem } from '../interfaces/filter-item';
import { Observable } from 'rxjs';
import { ContentItem } from '../interfaces/content-item';
import { Cocktail } from '../interfaces/cocktail';

@Injectable({
  providedIn: 'root'
})

export class NetworkService {
  private drinks = 'drinks';

  constructor(private http: HttpClient) {}

  getFilterItems$(): Observable<Array<FilterItem>> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .pipe(
        map(response => response[this.drinks]),
      );
  }

  getContentItems$(drinkCategory: string): Observable<Array<ContentItem>> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`)
      .pipe(
        map(response => response[this.drinks]),
      );
  }

  geteachitemItems$(detailDrinkName: string): Observable<Array<Cocktail>> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${detailDrinkName}`)
      .pipe(
        map(response => response[this.drinks]),
      );
  }
}
