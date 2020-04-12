import { Model } from 'objection';

export class User extends Model {
  static get tableName() {
    return '_User';
  }
  
  static get idColumn() {
    return 'objectId';
  }
}