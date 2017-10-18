import { existsSync } from 'fs';
import mkdirp from 'mkdirp';
import bodyParser from 'body-parser';
import express from 'express';
import { execSync } from 'child_process';
import { send, retrieve } from './amqp';

const port = process.env.PORT || 5001;
const app = express();
const repo = 'git@github.com:facebook/react-native.git';

const getShell = (version) => {
  const gitClone = `cd ./cache/${version} && git clone ${repo} && cd react-native`;
  const checkoutTag = `git checkout tags/v${version}`;

  return `${gitClone} && ${checkoutTag} && yarn`;
};

const fetchRepository = (version) => {
  const shellScript = getShell(version);

  mkdirp.sync(`./cache/${version}`);
  execSync(shellScript);
};

const onMessage = (data) => {
  const { version } = JSON.parse(data.content.toString());
  const hasLib = existsSync(`./cache/${version}/react-native`);
  let response = {
    fetched: false,
    cache: false,
  };

  if (!hasLib) {
    fetchRepository(version);
    response = Object.assign({}, response, { fetched: true });
  } else {
    response = Object.assign({}, response, { cache: true });
  }

  send(response)
    .then(result => console.log('Success!', result))
    .catch(error => console.log('Error!', error));
};

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  retrieve(data => onMessage(data));
  console.log('Node app is running on port:', port);
});
