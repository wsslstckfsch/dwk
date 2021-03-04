import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BreadcrumbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  exports: [NavbarComponent, BreadcrumbsComponent],
})
export class CoreModule {}
