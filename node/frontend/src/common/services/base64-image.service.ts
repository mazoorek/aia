import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class Base64ImageService {

  constructor(private sanitizer: DomSanitizer) {
  }

  getBase64HTMLImage(image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + image);
  }
}
