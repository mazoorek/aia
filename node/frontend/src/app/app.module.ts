import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingBasketComponent} from './shopping-basket/shopping-basket.component';
import {ShoppingListItemComponent} from './shopping-list/shopping-list-item/shopping-list-item.component';
import {HttpClientModule} from '@angular/common/http';
import {ShoppingBasketItemComponent} from './shopping-basket/shopping-basket-item/shopping-basket-item.component';
import {PopupComponent} from '../common/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingBasketComponent,
    ShoppingListItemComponent,
    ShoppingBasketItemComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
