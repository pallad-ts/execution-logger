import {ExecutionLogger} from "./ExecutionLogger";
import {LogMessage} from "./LogMessage";

export class LogMessageExecutionLogger extends ExecutionLogger<LogMessage> {
    info(message: string, ...args: any[]): this {
        return super.log(LogMessage.info(message, ...args));
    }

    error(message: string, ...args: any[]): this {
        return super.log(LogMessage.error(message, ...args));
    }

    warning(message: string, ...args: any[]): this {
        return super.log(LogMessage.warning(message, ...args));
    }
}
