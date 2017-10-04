import { Component, Input } from '@angular/core';
import { FacebookService } from 'ngx-facebook';

@Component({
  selector: 'mhs-facebook-share',
  templateUrl: './facebook-share.component.html',
  styleUrls: ['./facebook-share.component.css']
})
export class FacebookShareComponent {

  @Input() url: string;
  @Input() title: string;
  @Input() description: string;
  @Input() imageUrl: string;

  constructor(private fb: FacebookService) {
  }

  share() {
    const shareOptions = {
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': this.url,
          'og:title': this.title,
          'og:description': this.description,
          'og:image': this.imageUrl
        }
      })
    };

    this.fb.ui(shareOptions);
  }
}
