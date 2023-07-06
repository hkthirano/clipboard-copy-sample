import { Component } from '@angular/core';
import {
  getBlobFromImageElement,
  copyBlobToClipboard,
} from 'copy-image-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}

  async onClickTextCopy1() {
    await navigator.clipboard.writeText(new Date().toString());
    window.alert('copied!');
  }

  async onClickImageCopy1() {
    const img = document.getElementById('lenna') as HTMLImageElement;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0);

    canvas.toBlob(async (blob) => {
      const item = new ClipboardItem({
        'image/png': blob!,
      });
      await navigator.clipboard.write([item]);
      window.alert('copied!');
    });
  }

  async onClickImageCopy2() {
    const imageElement = document.getElementById('lenna') as HTMLImageElement;
    getBlobFromImageElement(imageElement)
      .then((blob) => {
        return copyBlobToClipboard(blob);
      })
      .then(() => {
        window.alert('copied!');
      });
  }
}
