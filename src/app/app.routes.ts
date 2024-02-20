import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: "", loadChildren:()=>import("./core/home/home.module").then(hom=>hom.HomeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '!' }]

})

export class AppRoutingModule { }