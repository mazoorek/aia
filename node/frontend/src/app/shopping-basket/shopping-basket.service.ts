import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {

  readonly SHOPPING_LIST_URL: string = '/api/complete-basket';

  constructor(private http: HttpClient) {
  }

  completeShopping(userBasket: {id: string, amount: number}[]): Observable<{ message: string}> {
    return this.http.put<{ message: string}>(this.SHOPPING_LIST_URL, userBasket);
  }
}
