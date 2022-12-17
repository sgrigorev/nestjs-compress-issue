import Fastify, { FastifyInstance } from 'fastify';
import { responseExample } from './response-example';

async function bootstrap() {
  const fastify: FastifyInstance = Fastify({
    disableRequestLogging: true,
    ignoreTrailingSlash: true,
    logger: true,
  });

  await fastify.register(import('@fastify/compress'), { global: true });

  fastify.addHook('onSend', function (request, reply, payload, next) {
    request.log.info(`Response payload: ${payload}`);
    next();
  });
  fastify.get('/test-fastify', async (request, reply) => {
    return reply.send(responseExample);
  });

  await fastify.listen({ port: 3000 });
}

bootstrap();
