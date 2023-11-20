import {Injectable} from '@nestjs/common';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Service} from 'apps/kedi-api/src/app/feature/data/models/service.model';
import {ServiceObj} from 'apps/kedi-api/src/app/feature/data/models/service-obj.model';

@Injectable()
export class DataService {
  private static _dataService: BehaviorSubject<DataService> = new BehaviorSubject<DataService>(null);
  private static _dataService$: Observable<DataService> = DataService._dataService.asObservable();
  services: { [key: string]: Service } = {};
  services$: Observable<ServiceObj>[] = [];

  constructor() {
    if (!DataService._dataService.getValue()) {
      DataService._dataService.next(this);
    }
  }

  static getInstance(): DataService {
    return DataService._dataService.getValue();
  }

  static getInstance$(): Observable<DataService> {
    return DataService._dataService$;
  }

  addService(serviceName: string) {
    const newService = new Service(serviceName);
    this.services[serviceName] = newService;
    this.services$.push(newService.asObservable());
  }

  notifyServiceChange = (serviceKeyName: string) => this.services[serviceKeyName].next();

  getServices$ = (): Observable<ServiceObj[]> => combineLatest(this.services$);
  getAService$ = (serviceName: string): Observable<ServiceObj> => this.services[serviceName].asObservable();
}
