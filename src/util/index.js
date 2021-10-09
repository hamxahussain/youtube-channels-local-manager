const {channelsLists} = require('./youtube');
const {list, move, listAll, listOnlyHidden} = require('./shellManager.js');
const {MONTHS} = require('./../global');

const videoDirCreaterFormater = (name = '') => {
  const d = new Date();
  const dateTime = `${d.getDate()}-${MONTHS[d.getMonth()].slice(
      0,
      3,
  )}-${d.getFullYear()} (${d.getHours()}:${d.getMinutes()}:${d.getSeconds()})`;
  return `./__${listAll('./').length + 1}__[--${name}--]__${dateTime}__`;
};
const videoDirFormatDecoder = (name = '') => {
  return name.split('__[--')[1].split('--]__')[0];
};

module.exports = {
  channelsLists,
  list,
  move,
  videoDirFormatDecoder,
  listAll,
  listOnlyHidden,
  videoDirCreaterFormater,
};
