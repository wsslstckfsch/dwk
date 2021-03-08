import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopIntroComponent } from './shop-intro/shop-intro.component';

const routes: Routes = [
  { path: '', component: ShopIntroComponent },
  {
    path: ':id',
    component: ProductDetailsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
