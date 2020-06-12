import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { IEnvConfig } from './models/config.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;

  constructor() {
    const envFilePath = `env/${process.env.NODE_ENV || 'local'}.env`;
    const config: IEnvConfig = dotenv.parse(fs.readFileSync(envFilePath)) as any;
    this.envConfig = this.validateEnvConfig(config);
  }

  public get(key: keyof IEnvConfig): string {
    return this.envConfig[key];
  }

  get isLocal(): boolean {
    return this.get('NODE_ENV') === 'local';
  }

  get isDev(): boolean {
    return this.get('NODE_ENV') === 'development';
  }

  get isProd(): boolean {
    return this.get('NODE_ENV') === 'production';
  }

  private validateEnvConfig(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'staging', 'production', 'local', 'test')
        .required(),
      NEST_ENDPOINT: Joi.string().required(),
      NEST_PORT: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.string().default('3306'),
      DB_USER: Joi.string().required(),
      DB_PASS: Joi.string().required(),
      DB_NAME: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);

    if (error) {
      throw new Error(`Env config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
