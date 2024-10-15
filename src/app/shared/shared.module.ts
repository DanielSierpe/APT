import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class SharedModule { }
