#Prerequisites
* [RabbitMQ]('http://www.rabbitmq.com/') - if you are on OSX you can install and run it via `brew`:
  - `brew install rabbitmq` to install
  - `brew services start rabbitmq` to start rabbitmq
* [Node.js]('https://nodejs.org/en/') - you can download it and install as any other application. Or(on OSX) you can run `brew install node` and let `brew` do all the job.
* (Optional) [Yarn]('https://yarnpkg.com/') - this is not mandatory, but recommended tool for faster package management.

#Launch the application
- `git clone` this repository.
- `cd amqp-test`
- `npm install` or `yarn`(if you decided to use `yarn`) to install dependencies.
- `npm run dev` or `yarn dev` to start the application.

#Testing
- open [RabbitMQ UI]('http://localhost:15672/')(acc: _guest_, password: _guest_)
- navigate to _Queues > retrieve_
- Click on _Publish Message_
- Add json object that has key `version` and value for it(desired react-native version), i.e. { "version": "0.45.0" }
- You should see `cache` folder being created(if it is missing) in the directory where you cloned this project and react-native being cloned there, once this clone is done, node app checkouts to specific **_tag_** which is react-native version. Clone and checkout are skipped if such version already is in the cache.
- Once cloning & checkout/cache checking is done. Response is sent to another RabbitMQ queue named _send_. Response is an object of two keys: _cache_ and _fetched_, one will have value `true`(depending: if it was `git clone`'ed or was in the cache).
- To validate that message was sent to the queue you can go to [RabbitMQ UI]('http://localhost:15672/') and navigate to _Queues > send_ where you can see how many messages there is in the queue and retrieve them by clicking on _Get messages_
