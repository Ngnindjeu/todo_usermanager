import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Alert} from '../../models/alert';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {
  @Input() id = 'initAlert';

  alerts: Alert[] = [];
  alertSubscription: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        this.alerts.push(alert);
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 5000);
        }
      });
  }

  removeAlert(alertToRemove: Alert) {
    if (!this.alerts.includes(alertToRemove)) return;
    this.alerts = this.alerts.filter(alert => alert !== alertToRemove);
  }
}
