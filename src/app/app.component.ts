import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}

  /*
  textコピーは、AngularMaterialのCDKにもある。
  ただし、内部ではブラウザ非推奨のAPI document.execCommand('copy') を使っている。
  https://github.com/angular/components/blob/main/src/cdk/clipboard/pending-copy.ts
  */
  async onClickTextCopy1() {
    try {
      await navigator.clipboard.writeText(new Date().toString());
      window.alert('copied!');
    } catch (err) {
      window.alert(err);
    }
  }

  // Safariでは動かない
  async onClickImageCopy1() {
    try {
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
    } catch (err) {
      window.alert(err);
    }
  }

  // Safariでは動くが、なぜかFirefoxでは動かない
  async onClickImageCopy2() {
    try {
      const img = document.getElementById('lenna') as HTMLImageElement;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const makeImagePromise = async () => {
        return new Promise<Blob>((resolve) =>
          canvas.toBlob((blob) => resolve(blob!))
        );
      };
      await navigator.clipboard.write([
        new ClipboardItem({ ['image/png']: makeImagePromise() }),
      ]);
      window.alert('copied!');
    } catch (err) {
      window.alert(err);
    }
  }

  async onClickLinkedTextCopy1() {
    try {
      const html = `<a href="http://test.com">${new Date().toString()}</a>`;
      const item = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
      });
      await navigator.clipboard.write([item]);
      window.alert('copied!');
    } catch (err) {
      window.alert(err);
    }
  }

  async onClickImageAndTextCopy1() {
    const imageUrl =
      'https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png';
    try {
      const imageData = await fetch(imageUrl);
      const imageBlob = await imageData.blob();
      const imageBase64Data = await this.blobToBase64(imageBlob);
      const html = `<a href="https://test.com">text1234567890text1234567890text1234567890</a><div><img width="200" height="200" src="${imageBase64Data}" /></div>`;

      const textBlob = new Blob([html], {
        type: 'text/html',
      });
      await navigator.clipboard.write([
        new ClipboardItem({
          [textBlob.type]: textBlob,
        }),
      ]);
      window.alert('copied!');
    } catch (err) {
      window.alert(err);
    }
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
