import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { FilterModule } from '../filter/filter.module';
import { ContentModule } from '../content/content.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [
    ProjectComponent,
  ],
  exports: [
    ProjectComponent,
  ],
  imports: [
    FilterModule,
    ContentModule,
    HeaderModule,
  ],
})
export class ProjectModule { }
