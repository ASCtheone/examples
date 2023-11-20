import {Observable, tap} from 'rxjs';
import {DataService} from 'apps/kedi-api/src/app/feature/data/data.service';

export const dataNotifier = (serviceName: string) => <T>(source: Observable<T>) =>
  source.pipe(tap(() => DataService.getInstance$().subscribe(i => i ? i.notifyServiceChange(serviceName) : null)));
