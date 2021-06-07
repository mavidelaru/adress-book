import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), ModalModule.forRoot(),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
