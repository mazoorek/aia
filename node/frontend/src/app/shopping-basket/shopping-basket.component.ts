import {Component, OnInit} from '@angular/core';
import {ShopItem} from '../shopping-list/shopping-list.service';
import {Router} from '@angular/router';
import {ShoppingBasketService} from './shopping-basket.service';

@Component({
  selector: 'shopping-basket',
  template: `
    <modal-popup *ngIf="showPopupMessage" (closePopup)="onPopupClose()"><p>{{popupMessage}}</p></modal-popup>
    <div class="shopping-basket-container">
      <div class="basket-attachment-container">
        <div class="basket-attachment basket-attachment--go-back" (click)="navigateToShoppingList()">
          <p>wróć do listy produktów</p>
        </div>
        <div class="basket-attachment basket-attachment--submit" *ngIf="basketList.length >0" (click)="completeShopping()">
          <p>zrealizuj zakupy</p>
        </div>
      </div>
      <div class="no-products-in-basket" *ngIf="basketList.length==0">
        Brak produktów w koszyku
      </div>
      <ng-container *ngIf="basketList.length > 0">
        <div *ngFor="let basketItem of basketList">
          <shopping-basket-item [basketItem]="basketItem"
                                (deleteBasketItem)="deleteBasketItem(basketItem.id)"></shopping-basket-item>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['shopping-basket.component.scss']
})
export class ShoppingBasketComponent implements OnInit {

  basketList: ShopItem[] = [];
  showPopupMessage: boolean = false;
  popupMessage: string = '';

  constructor(private router: Router, private shoppingBasketService: ShoppingBasketService) {
  }

  ngOnInit(): void {
    this.basketList = JSON.parse(sessionStorage.getItem('userBasket'));
    if (!this.basketList) {
      this.basketList = [];
    }
  }

  onPopupClose() {
    sessionStorage.clear();
    this.basketList = [];
    this.showPopupMessage = false;
    this.router.navigate(['/shopping-list']);
  }

  navigateToShoppingList(): void {
    this.router.navigate(['/shopping-list']);
  }

  deleteBasketItem(removeId: string): void {
    const removedBasketItemIndex = this.basketList.findIndex(basketItem => basketItem.id === removeId);
    this.basketList.splice(removedBasketItemIndex, 1);
    sessionStorage.setItem('userBasket', JSON.stringify(this.basketList));

  }

  completeShopping(): void {
    this.shoppingBasketService.completeShopping(this.basketList.map(item => ({id: item.id, amount: item.amount})))
      .subscribe((response: { message: string}) => {
        console.log('halo');
        this.popupMessage = response.message;
        this.showPopupMessage = true;
        console.log(this.showPopupMessage);
      });
  }
}
