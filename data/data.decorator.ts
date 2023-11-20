import {DataService} from 'apps/kedi-api/src/app/feature/data/data.service';

export const DataHandler = (serviceName: string): ClassDecorator => () => {
  DataService.getInstance$().subscribe(instance => instance ? instance.addService(serviceName) : null);
};
