import { EventEmitter } from 'events';
import chalk from 'chalk';

type LogLevel = 'info' | 'warn' | 'error' | 'success';

//允许在日志记录时触发事件。
export class Logger extends EventEmitter {
    private logLevel: LogLevel;

    // 默认日志级别
    constructor() {
        super();
        this.logLevel = 'info';
    }

    setLogLevel(level: LogLevel) {
        this.logLevel = level;
    }

    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] ${this.getLevelPrefix(level)}: ${message}`;
    }

    private getLevelPrefix(level: LogLevel): string {
        switch (level) {
            case 'info':
                return chalk.blue('INFO');
            case 'warn':
                return chalk.yellow('WARN');
            case 'error':
                return chalk.red('ERROR');
            case 'success':
                return chalk.green('SUCCESS');
            default:
                return '';
        }
    }

    log(level: LogLevel, message: string) {
        if (this.shouldLog(level)) {
            const formattedMessage = this.formatMessage(level, message);
            console.log(formattedMessage);
            this.emit('log', { level, message, timestamp: new Date().toISOString() });
        }
    }

    info(message: string) {
        this.log('info', message);
    }

    warn(message: string) {
        this.log('warn', message);
    }

    error(message: string) {
        this.log('error', message);
    }

    success(message: string) {
        this.log('success', message);
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['info', 'warn', 'error', 'success'];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }
}

const log = new Logger();

export default log;
