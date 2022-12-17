import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorResponse: Record<string, unknown>) {}

  catch(err: Error, host: ArgumentsHost): FastifyReply {
    const reply = host.switchToHttp().getResponse<FastifyReply>();
    return reply.status(400).send(this.errorResponse);
  }
}
