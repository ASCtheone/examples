import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {sleep} from "../utils";
import {LicenseService} from "./license.service";

@Injectable()
export class QueueManagerService {
  private _processingQueue = false
  queue: (() => Promise<any>)[] = []

  constructor(private license: LicenseService) {
  }

  set processingQueue(newProcessingQueue: boolean) {
    this._processingQueue = newProcessingQueue;
  }

  get processingQueue(): boolean {
    return this._processingQueue;
  }

  @Cron('* */30 * * * *')
  async processQueue() {
    if(!this.processingQueue && this.queue.length > 0 && this.license.license)
    {
      Logger.log('Processing queue: left on queue : ' + this.queue.length)
      this.processingQueue = true
      try {
        await this.queue.shift()();
        await sleep(1000);
        this.processingQueue = false;
        this.processQueue();
      } catch (e) {
        console.log(e);
        this.processingQueue = false;
        this.processQueue();
      }
    }
    if (this.queue.length === 0) {
      Logger.log('No elements in the queue')
      this.processingQueue = false;
    }
  }

  async AddQueue(callbackFunction: any) {
    if (!this.processingQueue) {
      this.queue.push(callbackFunction);
    }
  }

}
