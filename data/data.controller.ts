import {Controller, Get, Param, Req, Sse} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {DataService} from 'apps/kedi-api/src/app/feature/data/data.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Controller('data')
@ApiTags('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @Sse('services')
  sse(): Observable<MessageEvent> {
    return this.dataService.getServices$().pipe(map(services => ({ data: services })));
  }

  @Sse('services/:serviceName')
  sseByServiceName(@Req() req, @Param('serviceName') serviceName: string): Observable<MessageEvent> {
    return this.dataService.getAService$(serviceName).pipe(map(service => ({ data: service })));
  }

  @Get('notifyService/:serviceName')
  notifyAService(@Req() req, @Param('serviceName') serviceName: string) {
    this.dataService.notifyServiceChange(serviceName);
  }
}

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
