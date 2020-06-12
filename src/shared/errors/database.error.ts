export class DatabaseError extends Error {
  public constructor() {
    super('There was an error while operating the database');
  }
}
