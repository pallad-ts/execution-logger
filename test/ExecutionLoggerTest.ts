import {ExecutionLogger} from "@src/ExecutionLogger";
import {faker} from '@faker-js/faker';
import * as sinon from 'sinon';
import {log} from "util";

describe('ExecutionLogger', () => {
    const MESSAGE_1 = faker.lorem.sentence();
    const MESSAGE_2 = faker.lorem.sentence();

    it('allows to listen on messages', () => {
        const stub = sinon.stub();

        const logger = new ExecutionLogger();
        logger.onMessage(stub);
        logger.log(MESSAGE_1);
        logger.log(MESSAGE_2);

        sinon.assert.calledTwice(stub);
        sinon.assert.calledWith(stub, MESSAGE_1);
        sinon.assert.calledWith(stub, MESSAGE_2);
    });

    it('creating with initial listener', () => {
        const stub = sinon.stub();
        const logger = ExecutionLogger.create(stub);

        logger.log(MESSAGE_1);
        logger.log(MESSAGE_2);

        sinon.assert.calledTwice(stub);
        sinon.assert.calledWith(stub, MESSAGE_1);
        sinon.assert.calledWith(stub, MESSAGE_2);
    });

    describe('buffering messages', () => {
        it('creates buffer that stores messages', () => {
            const logger = new ExecutionLogger();
            const buffer = logger.bufferMessages();

            logger.log(MESSAGE_1);
            logger.log(MESSAGE_2);

            expect(buffer.getMessages())
                .toEqual([MESSAGE_1, MESSAGE_2]);
        });

        it('creates buffer with provided max length', () => {
            const logger = new ExecutionLogger();
            const buffer = logger.bufferMessages(10);

            expect(buffer)
                .toHaveProperty('max', 10);
        });

        it('buffers messages only from the point when you start buffering it', () => {
            const logger = new ExecutionLogger();
            logger.log(MESSAGE_1);
            const buffer = logger.bufferMessages();
            logger.log(MESSAGE_2);

            expect(buffer.getMessages())
                .toEqual([MESSAGE_2]);
        });
    });
})
