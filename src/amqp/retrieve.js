import { connection } from './utils';
import { RETRIEVE_QUEUE } from '../constants';

const retrieve = (callback) => {
  const onMessage = (data) => {
    callback(data);
    // eslint-disable-next-line
    channelWrapper.ack(data);
  };

  const channelWrapper = connection.createChannel({
    setup: channel => Promise.all([
      channel.assertQueue(RETRIEVE_QUEUE, { durable: true }),
      channel.prefetch(1),
      channel.consume(RETRIEVE_QUEUE, onMessage),
    ]),
  });

  /* eslint-disable */ //bellow connection lines are for debugging purpose
  connection.on('connect', () => console.log('Connected!'));
  connection.on('disconnect', params => console.log('Disconnected.', params.err));
  channelWrapper.waitForConnect().then(() => console.log('Listening for messages'));
};

export default retrieve;
