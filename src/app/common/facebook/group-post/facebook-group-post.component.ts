import { Component, Input } from '@angular/core';
import { FacebookService, LoginOptions } from 'ngx-facebook';
import { NotificationService } from '../../../services/notification-service/notification.service';
import { Downgrade } from '../../../hybrid/downgrade';
import { environment } from '../../../../environments/environment';
import { FacebookGroupPostService } from './facebook-group-post.service';

@Downgrade()
@Component({
  selector: 'mhs-facebook-group-post',
  templateUrl: './facebook-group-post.component.html',
  styleUrls: ['../facebook-button.css']
})
export class FacebookGroupPostComponent {

  @Input() url: string;

  constructor(private fb: FacebookService,
              private notificationService: NotificationService,
              private postService: FacebookGroupPostService) {
  }

  postInGroup() {
    const loginOptions: LoginOptions = {
      scope: 'public_profile,email,publish_actions,user_managed_groups'
    };

    this.fb
      .login(loginOptions)
      .then(() => this.postService
        .getPostPrompt()
        .subscribe(
          message => this.send(message)
            .then(() => this.notificationService
              .showSuccess('FACEBOOK_GROUP_POST_SUCCESS')),
          () => this.notificationService.showError('FACEBOOK_AUTH_ERROR')
        ));
  }

  private send(message) {
    return this.fb
      .api(
        '/' + environment.facebookGroupId + '/feed',
        'post',
        {
          'message': message,
          'link': this.url
        },
      )
      .catch(() => this.notificationService.showError('FACEBOOK_GROUP_POST_ERROR'));
  }
}
