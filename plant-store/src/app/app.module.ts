import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreContainerComponent } from './store/store-container/store-container.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { interceptors } from './interceptors';

@NgModule({
  declarations: [AppComponent, StoreContainerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AppService, ...interceptors],
  bootstrap: [AppComponent]
})
export class AppModule {}
