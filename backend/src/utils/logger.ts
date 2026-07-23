import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

let pinoTransport: any = undefined;

if (isDev) {
  try {
    require.resolve('pino-pretty');
    pinoTransport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    };
  } catch {
    pinoTransport = undefined;
  }
}

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: pinoTransport,
});
