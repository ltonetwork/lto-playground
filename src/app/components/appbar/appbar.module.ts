import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatMenuModule,
  MatDividerModule
} from '@angular/material';
import { AppbarComponent } from './appbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild([]),
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  declarations: [AppbarComponent],
  exports: [AppbarComponent]
})
export class AppbarModule {}
