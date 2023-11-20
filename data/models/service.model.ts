import {BehaviorSubject, Observable} from 'rxjs';
import {ServiceObj} from 'apps/kedi-api/src/app/feature/data/models/service-obj.model';
import { randomUUID } from 'crypto'
import {map} from 'rxjs/operators';
export class Service {
  name: string;
  private _: BehaviorSubject<string> = new BehaviorSubject<string>(randomUUID());
  private $: Observable<string> = this._.asObservable();

  constructor(name: string) {
    this.name = name;
  }

  next = () => this._.next(randomUUID());

  asObservable = (): Observable<ServiceObj> => this.$.pipe(map(id => ({ id, name: this.name })));
}
