import {ExecutionLogger} from "./ExecutionLogger";

export class MessagesBuffer<T = string> {
    private messages: T[] = [];

    constructor(readonly max: number = Number.POSITIVE_INFINITY) {

    }

    add(message: T) {
        this.messages.push(message);
        if (this.messages.length > this.max) {
            this.messages.shift();
        }
    }

    attachToLogger(logger: ExecutionLogger<T>) {
        logger.onMessage(this.add.bind(this));
    }

    getMessages() {
        return this.messages;
    }
}
