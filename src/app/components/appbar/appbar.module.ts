import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';
import { AppbarComponent } from './appbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatToolbarModule, RouterModule.forChild([])],
  declarations: [AppbarComponent],
  exports: [AppbarComponent]
})
export class AppbarModule {}
