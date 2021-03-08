import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: ':lang',
    children: [
      {
        path: 'server-error',
        component: ServerErrorComponent,
        data: {},
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
        data: {},
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./shop/shop.module').then((mod) => mod.ShopModule),
        data: {},
      },
      {
        path: 'basket',
        loadChildren: () =>
          import('./basket/basket.module').then((mod) => mod.BasketModule),
        data: {},
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./checkout/checkout.module').then(
            (mod) => mod.CheckoutModule
          ),
        data: {},
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((mod) => mod.AccountModule),
        data: {},
      },
      {
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./orders/orders.module').then((mod) => mod.OrdersModule),
        data: {},
      },
      {
        path: 'wdv',
        children: [
          {
            path: 'shop',
            loadChildren: () =>
              import('./shop/shop.module').then((mod) => mod.ShopModule),
            data: {},
          },
          {
            path: 'basket',
            loadChildren: () =>
              import('./basket/basket.module').then((mod) => mod.BasketModule),
            data: {},
          },
          {
            path: 'checkout',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('./checkout/checkout.module').then(
                (mod) => mod.CheckoutModule
              ),
            data: {},
          },
          {
            path: 'account',
            loadChildren: () =>
              import('./account/account.module').then(
                (mod) => mod.AccountModule
              ),
            data: {},
          },
          {
            path: 'orders',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('./orders/orders.module').then((mod) => mod.OrdersModule),
            data: {},
          },
        ],
      },
      { path: '', redirectTo: '/shop', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
