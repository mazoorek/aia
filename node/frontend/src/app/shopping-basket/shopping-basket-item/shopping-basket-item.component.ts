import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShopItem} from '../../shopping-list/shopping-list.service';
import {Base64ImageService} from '../../../common/services/base64-image.service';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'shopping-basket-item',
  template: `
    <img class="basket-item-property basket-item-property__image" [src]="getBasketItemImagePath()" alt="brak zdjęcia">
    <div class="basket-item-property">{{basketItem.name}}</div>
    <div class="basket-item-property">{{basketItem.amount}} szt.</div>
    <div class="basket-item-property">{{basketItem.price}}zł</div>
    <div class="basket-item-property">
      <p class="basket-item-property__delete-button" (click)="deleteBasketItem.emit()">+</p>
    </div>
  `,
  styleUrls: ['shopping-basket-item.component.scss']
})
export class ShoppingBasketItemComponent {
  @Input() basketItem: ShopItem;
  @Output() deleteBasketItem: EventEmitter<void> = new EventEmitter<void>();

  constructor(private base64ImageService: Base64ImageService) {
  }

  getBasketItemImagePath(): SafeResourceUrl {
    return this.base64ImageService.getBase64HTMLImage(this.basketItem.image);
  }
}
