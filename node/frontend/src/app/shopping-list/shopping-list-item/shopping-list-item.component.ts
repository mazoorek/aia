import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Base64ImageService} from '../../../common/services/base64-image.service';
import {SafeResourceUrl} from '@angular/platform-browser';
import {Base64Image} from '../../../assets/base64-images';
import {CurrentShopItem} from '../shopping-list.component';

@Component({
  selector: 'shopping-list-item',
  template: `
    <img class="shop-item-property shop-item-property__image" [src]="getShopItemImagePath()" alt="brak zdjęcia">
    <div class="shop-item-property">{{shopItem.name}}</div>
    <div class="shop-item-property amount-container">
      <button class="amount-container__switch" (click)="decreaseAmountOfOrderedItem()">-</button>
      <span class="amount-container__value">{{this.orderedAmount}}</span>
      <button class="amount-container__switch" (click)="increaseAmountOfOrderedItem()">+</button>
    </div>
    <div class="shop-item-property">{{shopItem.price}}zł</div>
    <div class="shop-item-property">
      <button class="basket-button" (click)="addItemToBasket()">
        <p class="basket-button__label">Dodaj do koszyka</p>
        <img class="basket-button__image" [src]="base64ImageService.getBase64HTMLImage(base64Image.BASKET)" alt="">
      </button>
    </div>
  `,
  styleUrls: ['shopping-list-item.component.scss']
})
export class ShoppingListItemComponent {

  readonly base64Image: typeof Base64Image = Base64Image;

  @Input() shopItem: CurrentShopItem;
  @Output() addToBasket: EventEmitter<number> = new EventEmitter<number>();

  orderedAmount: number = 0;

  constructor(private base64ImageService: Base64ImageService) {
  }

  getShopItemImagePath(): SafeResourceUrl {
    return this.base64ImageService.getBase64HTMLImage(this.shopItem.image);
  }

  increaseAmountOfOrderedItem(): void {
    if (this.orderedAmount < this.shopItem.currentAmount) {
      this.orderedAmount++;
    }
  }

  decreaseAmountOfOrderedItem(): void {
    if (this.orderedAmount > 0) {
      this.orderedAmount--;
    }
  }

  addItemToBasket(): void {
    this.addToBasket.emit(this.orderedAmount);
    this.orderedAmount = 0;
  }
}
