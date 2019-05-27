import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreContainerComponent } from './store/store-container/store-container.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivateComponent } from './auth/activate/activate.component';

const routes: Routes = [
  { path: '', component: StoreContainerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
