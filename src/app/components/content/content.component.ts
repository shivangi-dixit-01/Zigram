import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormValuesService } from '../../services/form-values.service';
import { NetworkService } from '../../services/network.service';
import { concatAll, map, mergeMap, takeUntil, tap, filter } from 'rxjs/operators';
import { ContentData } from '../../interfaces/content-data';
import { Observable, Subject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})

export class ContentComponent implements AfterViewInit, OnDestroy {
  public cocktails: ContentData[][] = [];
  public currentPage: ContentData[][];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.cocktails);
  public paginatorLength: number;
  public paginatorPageIndex: number;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private formValuesService: FormValuesService,
    private networkService: NetworkService,
    public loaderService: LoaderService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.getValues$().subscribe(categories => {
      this.cocktails = [...this.cocktails, categories];
      this.setPaginatorData();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getValues$(): Observable<ContentData[]> {
    return this.formValuesService.getValue$()
      .pipe(
        tap(() => this.cocktails = []),
        tap(() => !!this.paginator ? this.paginator.firstPage() : null),
        filter(formValues => !!formValues),
        map(formValues => Object.entries(formValues)
          .map((el: object) => el[0] = { title: el[0], display: el[1] })
          .filter(category => category.display === true)
        ),
        mergeMap(categories => categories.map(category => this.networkService.getContentItems$(category.title)
          .pipe(
            map(cocktails => [{ ...category, data: cocktails }]),
          )
        )),
        concatAll(),
        takeUntil(this.onDestroy$),
      );
  }

  setPaginatorData(): void {
    this.dataSource.paginator = this.paginator;
    this.paginatorLength = this.cocktails.length;
    this.currentPage = this.cocktails.slice(0, 1);
  }

  OnPageChange(event: PageEvent): void {
    const paginatorStartIndex = event.pageIndex;
    let paginatorEndIndex = paginatorStartIndex + event.pageSize;
    if (paginatorEndIndex > this.paginatorLength) {
      paginatorEndIndex = this.paginatorLength;
    }
    this.paginatorPageIndex = event.pageIndex;
    this.currentPage = this.cocktails.slice(paginatorStartIndex, paginatorEndIndex);
  }

  openDialog(drinkname: string): MatDialogRef<DetailsComponent> {
    const matcon = new MatDialogConfig()
    matcon.data = { drinkname };
    matcon.height = '550px';
    matcon.width = '800px';
    return this.dialog.open(DetailsComponent, matcon);
  }
}
