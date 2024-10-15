import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module'; // Importa SharedModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule // Añade SharedModule aquí
  ],
  declarations: [HomePage], // LayoutComponent NO debe estar aquí
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añade esta línea
})
export class HomePageModule {}
