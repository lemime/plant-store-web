import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreContainerComponent } from './store/store-container/store-container.component';

const routes: Routes = [{ path: '', component: StoreContainerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
