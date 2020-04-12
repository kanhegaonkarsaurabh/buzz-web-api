import { Model } from 'objection';

export class Event extends Model {
  static get tableName() {
    return 'Event';
  }
  
  static get idColumn() {
    return 'objectId';
  }

  static get virtualAttributes() {
    return ['isLive'];
  }

  get isLive() {
    let now = Date.now();
    if (this.startTimestamp.valueOf() < now && this.endTimestamp.valueOf() > now) {
      return true;
    }
    return false
  }
}