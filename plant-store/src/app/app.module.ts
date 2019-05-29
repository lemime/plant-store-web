import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreContainerComponent } from './store/store-container/store-container.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { interceptors } from './interceptors';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivateComponent } from './auth/activate/activate.component';
import { NavigationBarComponent } from './ui/navigation-bar/navigation-bar.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetInitComponent } from './auth/reset-init/reset-init.component';
import { PlantItemComponent } from './store/plant-item/plant-item.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreContainerComponent,
    LoginComponent,
    RegisterComponent,
    ActivateComponent,
    NavigationBarComponent,
    ResetPasswordComponent,
    ResetInitComponent,
    PlantItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [AppService, ...interceptors],
  bootstrap: [AppComponent]
})
export class AppModule {}
