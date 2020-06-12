import { Request } from 'express';

import { IDataloader } from '../../dataloader/models/dataloader.interface';

export interface IGraphQLContext {
  req: Request;
  res: Response;
  dataloader: IDataloader;
}
