import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Alert} from '../../models/alert';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'initAlert';

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(elem => elem && elem.id === id));
  }

  success(message: string, options?: any) {
    this.alert(new Alert(undefined, message, options));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }
}
