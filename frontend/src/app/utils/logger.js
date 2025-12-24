const isProd = process.env.NODE_ENV === 'production';

function noop() {}

const logger = {
  log: isProd ? noop : console.log.bind(console),
  warn: isProd ? noop : console.warn.bind(console),
  error: isProd ? noop : console.error.bind(console),
};

export default logger;
