import { Controller, Get } from '@nestjs/common';
import { responseExample } from './response-example';

@Controller()
export class AppController {
  @Get('test-nestjs-error')
  testResponseFromExceptionFilter(): string {
    throw new Error('some error');
  }

  @Get('test-nestjs')
  successResponse(): Record<string, unknown> {
    return responseExample;
  }
}
