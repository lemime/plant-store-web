import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreContainerComponent } from './store/store-container/store-container.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivateComponent } from './auth/activate/activate.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetInitComponent } from './auth/reset-init/reset-init.component';
import { AddImageComponent } from './admin/add-image/add-image.component';

const routes: Routes = [
  { path: '', component: StoreContainerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent },
  { path: 'reset2', component: ResetPasswordComponent },
  { path: 'reset1', component: ResetInitComponent },
  { path: 'image', component: AddImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
