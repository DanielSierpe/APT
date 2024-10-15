import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PanelControlRoutingModule } from './panel-control-routing.module';
import { PanelControlComponent } from './panel-control.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PanelControlRoutingModule,
    SharedModule
  ],
  declarations: [PanelControlComponent]
})
export class PanelControlModule { }
