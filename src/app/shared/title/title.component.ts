import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <h1 class="title">{{title}}</h1>
  `,
  styles: [`
    .title{
      margin: 20px 0;
      text-align: center;
    }
  `]
})
export class TitleComponent{
  @Input() title: string;
}
