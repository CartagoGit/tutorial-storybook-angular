import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pure-inbox-screen',
  templateUrl: './pure-inbox-screen.component.html',
  styleUrls: ['./pure-inbox-screen.component.css'],
})
export class PureInboxScreenComponent {
  @Input() error: any;
}
