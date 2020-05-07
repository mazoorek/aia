import {Component, OnInit} from '@angular/core';
import {Base64ImageService} from '../../common/services/base64-image.service';
import {ShopItem, ShoppingListService} from './shopping-list.service';
import {Base64Image} from '../../assets/base64-images';
import {Router} from '@angular/router';

export interface CurrentShopItem extends ShopItem {
  currentAmount: number;
}

@Component({
  selector: 'shopping-list',
  template: `
    <modal-popup *ngIf="showPopupMessage" (closePopup)="showPopupMessage=false">
      <p>Utraciłeś zawartość koszyka z powodu modyfikacji listy produktów.</p>
    </modal-popup>
    <div class="shopping-list-container">
      <div class="basket-attachment-container">
        <div class="basket-attachment" (click)="navigateToBasket()">
          <span>Przejdź do koszyka</span>
          <img class="basket-attachment__image" [src]="base64ImageService.getBase64HTMLImage(base64Image.BASKET)"
               alt="">
        </div>
      </div>
      <ng-container *ngFor="let shopItem of currentShoppingList;trackBy: trackByFn">
        <shopping-list-item *ngIf="shopItem.currentAmount > 0"
                            [shopItem]="shopItem"
                            (addToBasket)="addToBasket(shopItem, $event)"></shopping-list-item>
      </ng-container>
    </div>
  `,
  styleUrls: ['shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  readonly base64Image: typeof Base64Image = Base64Image;

  currentShoppingList: CurrentShopItem[];
  showPopupMessage: boolean = false;

  constructor(private base64ImageService: Base64ImageService,
              private router: Router,
              private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingListService.getShopItems().subscribe(shoppingList => {
      if (this.shoppingListService.shoppingList) {
        console.log(JSON.stringify(this.shoppingListService.shoppingList) === JSON.stringify(shoppingList));
        if (JSON.stringify(this.shoppingListService.shoppingList) !== JSON.stringify(shoppingList)) {
          if (JSON.parse(sessionStorage.getItem('userBasket'))) {
            this.showPopupMessage = true;
            sessionStorage.clear();
          }
        }
      } else {
        this.shoppingListService.shoppingList = shoppingList;
      }
      this.currentShoppingList = this.shoppingListService.shoppingList.map(shopItem => ({
        ...shopItem,
        currentAmount: shopItem.amount
      }));
      const userBasket: ShopItem [] = JSON.parse(sessionStorage.getItem('userBasket'));
      if (userBasket && userBasket.length > 0) {
        this.currentShoppingList.forEach(currentShopItem => {
          const currentShopItemInBasket: ShopItem = userBasket.filter(basketItem => basketItem.id === currentShopItem.id)[0];
          if (currentShopItemInBasket) {
            currentShopItem.currentAmount -= currentShopItemInBasket.amount;
          }
        });
      }
    });
  }

  trackByFn(index, item): number {
    return index;
  }

  navigateToBasket(): void {
    this.router.navigate(['/shopping-basket']);
  }

  addToBasket(shopItem: CurrentShopItem, orderedAmount: number) {
    if (orderedAmount > 0) {
      let userBasket: ShopItem[] = JSON.parse(sessionStorage.getItem('userBasket'));
      if (!userBasket) {
        userBasket = [];
      }
      const itemAlreadyInBasket: boolean = userBasket.filter(basketItem => basketItem.id === shopItem.id).length > 0;
      if (itemAlreadyInBasket) {
        userBasket.filter(basketItem => basketItem.id === shopItem.id)[0].amount += orderedAmount;
      } else {
        const newUserBasketItem = {...shopItem, amount: orderedAmount};
        delete newUserBasketItem.currentAmount;
        userBasket.push(newUserBasketItem);
      }
      sessionStorage.setItem('userBasket', JSON.stringify(userBasket));
      this.currentShoppingList.forEach(currentShopItem => {
        if (currentShopItem.id === shopItem.id) {
          currentShopItem.currentAmount -= +orderedAmount;
        }
      });
    }
  }
}
