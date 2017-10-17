import { connection } from './utils';
import { SEND_QUEUE } from '../constants';

const channelWrapper = connection.createChannel({
  setup: channel => channel.assertQueue(SEND_QUEUE, { durable: true }),
});

const send = (message) => {
  const content = Buffer.from(JSON.stringify(message));

  return channelWrapper.sendToQueue(SEND_QUEUE, content)
    .then(response => response)
    .catch(error => error);
};

export default send;
