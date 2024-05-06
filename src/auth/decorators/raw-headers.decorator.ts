import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.rawHeaders;

    // Another way to get raw headers
    // const headers = request.headers;

    // return !data ? headers : headers[data];
  },
);
