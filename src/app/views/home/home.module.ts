import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {MainComponent} from "./main/main.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {NgbAccordionModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    SharedModule,
    NgbModalModule,
    NgbAccordionModule
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
