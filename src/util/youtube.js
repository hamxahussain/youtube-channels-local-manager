const shell = require('shelljs');
const {YOUTUBE_DIR} = require('../global');

module.exports.channelsLists = () => {
  let list = shell.ls(YOUTUBE_DIR);
  list = list.map((channel, i) => {
    if (typeof channel === 'string') return channel;
  });
  return list;
};
