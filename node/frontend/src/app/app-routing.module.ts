import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingBasketComponent} from './shopping-basket/shopping-basket.component';


const routes: Routes = [
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'shopping-basket', component: ShoppingBasketComponent},
  {path: '**', redirectTo: '/shopping-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
