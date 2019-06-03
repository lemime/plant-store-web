import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreContainerComponent } from './store/store-container/store-container.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivateComponent } from './auth/activate/activate.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetInitComponent } from './auth/reset-init/reset-init.component';
import { AddImageComponent } from './admin/add-image/add-image.component';
import { CartContainerComponent } from './cart/cart-container/cart-container.component';
import { RoleGuardService as RoleGuard } from './role-guard.service';
import { UserListComponent } from './admin/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: StoreContainerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartContainerComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [RoleGuard]
  },
  { path: 'activate', component: ActivateComponent },
  { path: 'reset2', component: ResetPasswordComponent },
  { path: 'reset1', component: ResetInitComponent },
  { path: 'plant/add', component: AddImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
