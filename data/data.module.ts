import {DataController} from 'apps/kedi-api/src/app/feature/data/data.controller';
import {DataService} from 'apps/kedi-api/src/app/feature/data/data.service';
import {Module} from '@nestjs/common';

@Module({
  imports: [
    // LoggerModule,
    // AuthModule
  ],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService]
})
export class DataModule {
}
