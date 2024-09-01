export const logger = {
  info: (params?: string | unknown, msg?: string) => {},
  trace: (params?: string | unknown, msg?: string) => {},
  warn: (params?: string | unknown, msg?: string) => {},
  error: (params?: string | unknown, msg?: string) => {},
  debug: (params?: string | unknown, msg?: string) => {},
  log: (params?: string | unknown, msg?: string) => {},
};

export function setLogger(newLogger: typeof logger) {
  logger.info = newLogger.info.bind(newLogger);
  logger.trace = newLogger.trace.bind(newLogger);
  logger.warn = newLogger.warn.bind(newLogger);
  logger.error = newLogger.error.bind(newLogger);
  logger.debug = newLogger.debug.bind(newLogger);
  logger.log = newLogger.log.bind(newLogger);
}
