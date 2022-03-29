import {MessagesBuffer} from "./MessagesBuffer";

export class ExecutionLogger<T = string> {
    private messagesListeners = new Set<ExecutionLogger.Listener<T>>();

    onMessage(func: ExecutionLogger.Listener<T>): this {
        this.messagesListeners.add(func);
        return this;
    }

    log(message: T): this {
        for (const listener of this.messagesListeners) {
            listener(message);
        }
        return this;
    }

    bufferMessages(max: number = Number.POSITIVE_INFINITY) {
        const buffer = new MessagesBuffer<T>(max);
        buffer.attachToLogger(this);
        return buffer;
    }

    static create<T>(listener?: ExecutionLogger.Listener<T>) {
        const logger = new ExecutionLogger<T>();
        if (listener) {
            logger.onMessage(listener);
        }
        return logger;
    }
}

export namespace ExecutionLogger {
    export type Listener<T> = (message: T) => void;
}
