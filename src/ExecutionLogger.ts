export class ExecutionLogger<T = string> {
    private messagesListeners = new Set<ExecutionLogger.Listener<T>>();
    private loggedMessages: T[] = [];

    onMessage(func: ExecutionLogger.Listener<T>): this {
        this.messagesListeners.add(func);
        return this;
    }

    log(message: T): this {
        this.loggedMessages.push(message);
        for (const listener of this.messagesListeners) {
            listener(message);
        }
        return this;
    }

    get messages(): readonly T[] {
        return this.loggedMessages;
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