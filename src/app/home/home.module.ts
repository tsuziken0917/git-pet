import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { PetComponent } from './pet/pet.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ExpPipe } from '../exp.pipe';


@NgModule({
  declarations: [HomeComponent, PetComponent, ExpPipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatProgressBarModule
  ]
})
export class HomeModule { }
