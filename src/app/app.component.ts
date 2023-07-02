import { Component } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private clipboard: Clipboard) {}

  onClickTextCopy() {
    this.clipboard.copy('https://sample1.com');
  }
}
