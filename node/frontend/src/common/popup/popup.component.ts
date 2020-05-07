import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'modal-popup',
  template: `
    <div class="popup">
      <div class="content">
        <ng-content></ng-content>
      </div>
      <div class="footer">
        <button class="close-button" (click)="closePopup.emit()">wróć do wyboru produktów</button>
      </div>
    </div>
  `,
  styleUrls: ['popup.component.scss']
})
export class PopupComponent {
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
}
