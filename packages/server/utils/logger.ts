import { transports, format, createLogger } from 'winston';
import 'winston-daily-rotate-file';

const infoTransport = new (transports.DailyRotateFile)({
    filename: 'logs/all/%DATE%.log',
    datePattern: 'HH-mm_DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
        format.timestamp(),
    ),
    level: 'info',
    handleExceptions: true,
});


const errorTransport = new (transports.DailyRotateFile)({
    filename: 'logs/error/%DATE%.log',
    datePattern: 'HH-mm_DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
        format.timestamp(),
    ),
    level: 'error',
    handleExceptions: true,
});

const consoleTransport = new transports.Console({
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    level: 'debug',
    handleExceptions: true,
})

var logger = createLogger({
    format: format.combine(
        format.simple(),
    ),
    transports: [ infoTransport, errorTransport, consoleTransport ],
    exitOnError: false
});


class infoStream {
    write(text: string) {
        logger.info(text)
    }
}
class errorStream {
    write(text: string) {
        logger.error(text)
    }
}

const infoLogger = new infoStream();
const errorLogger = new errorStream();
export { infoLogger, errorLogger }