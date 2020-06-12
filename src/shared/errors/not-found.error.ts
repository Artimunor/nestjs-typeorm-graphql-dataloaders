import { NotFoundException } from '@nestjs/common';

export class NotFoundError extends NotFoundException {
  public constructor(message: string, data: any) {
    super(`${message} with ${JSON.stringify(data)}`);
  }
}
