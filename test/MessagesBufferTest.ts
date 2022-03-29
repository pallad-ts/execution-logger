import {faker} from "@faker-js/faker";
import {MessagesBuffer} from "@src/MessagesBuffer";
import {ExecutionLogger} from "@src/ExecutionLogger";

describe('MessagesBuffer', () => {
    const MESSAGE_1 = faker.lorem.sentence();
    const MESSAGE_2 = faker.lorem.sentence();
    const MESSAGE_3 = faker.lorem.sentence();
    const MESSAGE_4 = faker.lorem.sentence();
    it('stores only recent max messages', () => {
        const buffer = new MessagesBuffer(2);
        buffer.add(MESSAGE_1);
        buffer.add(MESSAGE_2);
        buffer.add(MESSAGE_3);
        buffer.add(MESSAGE_4);

        expect(buffer.getMessages())
            .toEqual([MESSAGE_3, MESSAGE_4]);
    });

    it('by default there is no limit for messages', () => {
        const buffer = new MessagesBuffer();
        expect(buffer)
            .toHaveProperty('max', Number.POSITIVE_INFINITY);
    });

    it('attaching to logger stores new messages from it', () => {
        const logger1 = new ExecutionLogger();
        const logger2 = new ExecutionLogger();

        const buffer = new MessagesBuffer();

        buffer.attachToLogger(logger1);
        buffer.attachToLogger(logger2);

        logger1.log(MESSAGE_1);
        logger2.log(MESSAGE_2);
        logger1.log(MESSAGE_3);
        logger2.log(MESSAGE_4);

        expect(buffer.getMessages())
            .toEqual([MESSAGE_1, MESSAGE_2, MESSAGE_3, MESSAGE_4]);
    });
});
