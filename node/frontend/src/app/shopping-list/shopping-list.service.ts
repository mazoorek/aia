import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export interface ShopItem {
  id: string;
  name: string;
  image: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  readonly SHOPPING_LIST_URL: string = '/api/shopping-list';

  shoppingList: ShopItem [];

  constructor(private http: HttpClient) {
  }

  getShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(this.SHOPPING_LIST_URL);
  }
}
