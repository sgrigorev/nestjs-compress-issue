import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import Fastify, { FastifyInstance } from 'fastify';
import compression from '@fastify/compress';
import { AppExceptionFilter } from './app.exception-filter';
import { responseExample } from './response-example';

async function getFastifyAdapter(): Promise<FastifyAdapter> {
  const fastify: FastifyInstance = Fastify({
    disableRequestLogging: true,
    ignoreTrailingSlash: true,
    logger: true,
  });

  fastify.addHook('onSend', function (request, reply, payload, next) {
    request.log.info(`Response payload: ${payload}`);
    next();
  });

  return new FastifyAdapter(fastify);
}

async function bootstrap() {
  const adapter = await getFastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  app.useGlobalFilters(new AppExceptionFilter(responseExample));
  await app.listen(3000);
}
bootstrap();
