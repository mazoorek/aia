import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Base64ImageService} from '../common/services/base64-image.service';
import {Base64Image} from '../assets/base64-images';

@Component({
  selector: 'app-root',
  template: `
    <div class="header">Shoe shop</div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imagePath: SafeResourceUrl = '';

  constructor(private base64ImageService: Base64ImageService) {
  }

  ngOnInit(): void {
    this.imagePath = this.base64ImageService.getBase64HTMLImage(Base64Image.BASKET);
  }
}
