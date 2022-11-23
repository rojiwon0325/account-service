import { IResponse } from '@COMMON/interface/response.interface';
import { ExceptionMessage } from '@COMMON/exception/exception-message';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const body =
      exception instanceof HttpException
        ? mapper_HTTP(exception)
        : mapper_ISE(exception);
    httpAdapter.reply(ctx.getResponse(), body, body.statusCode);
  }
}

const mapper_HTTP = (exception: HttpException): IResponse => ({
  statusCode: exception.getStatus(),
  message: extractMessageInHttpException(exception),
});
const mapper_ISE = (exception: unknown): IResponse => {
  console.log(exception);
  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: ExceptionMessage.ISE,
  };
};

const extractMessageInHttpException = (exception: HttpException): string => {
  const message = exception.message;
  if (
    exception.name === 'BadRequestException' &&
    message === 'Request message is not following the promised type.'
  ) {
    // tson error
    const response = exception.getResponse() as any;
    const reason = response.reason as string | null;
    return `${
      reason ? reason.split(/(\$input.)(.*?)(, )/g)[2] + ' ' : ''
    }입력값이 잘못되었습니다.`;
  }

  return exception.message;
};
