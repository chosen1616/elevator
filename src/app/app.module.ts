import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { PanelComponent } from './panel/panel.component';
import { FloorComponent } from './floor/floor.component';

@NgModule({
  declarations: [
    AppComponent,
    ElevatorComponent,
    PanelComponent,
    FloorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
