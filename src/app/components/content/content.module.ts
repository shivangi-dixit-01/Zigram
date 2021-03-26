import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    ContentComponent,
  ],
  exports: [
    ContentComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
  ],
})
export class ContentModule { }
