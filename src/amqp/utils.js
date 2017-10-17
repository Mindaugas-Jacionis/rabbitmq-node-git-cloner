import amqp from 'amqp-connection-manager';
import { host, port, user, password, vhost } from '../../config/amqp.json';

const connection = amqp.connect(
  [`amqp://${user}:${password}@${host}:${port}/${vhost}?heartbeat=600`],
  { json: true },
);

// eslint-disable-next-line
export { connection };
