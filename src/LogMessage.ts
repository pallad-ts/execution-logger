import {format} from 'util';

export class LogMessage {
    constructor(readonly type: LogMessage.Type, readonly message: string) {
        Object.freeze(this);
    }

    static log(type: LogMessage.Type, message: string, ...args: any[]) {
        return new LogMessage(type, format(message, ...args));
    }

    static info(message: string, ...args: any[]) {
        return LogMessage.log('info', message, ...args);
    }

    static error(message: string, ...args: any[]) {
        return LogMessage.log('error', message, ...args);
    }

    static warning(message: string, ...args: any[]) {
        return LogMessage.log('warning', message, ...args);
    }

    toString() {
        return `${this.type.toUpperCase()}: ${this.message}`;
    }
}

export namespace LogMessage {
    export type Type = 'error' | 'info' | 'warning';
}