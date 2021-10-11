const shell = require('shelljs');
const { YOUTUBE_DIR_FULL } = require('../global');
const { MONTHS } = require("../global")
const { listAll } = require("./shellManager")
module.exports.channelsLists = () => {
  let list = shell.ls(YOUTUBE_DIR_FULL);
  list = list.map((channel, i) => {
    if (typeof channel === 'string') return channel;
  });
  return list;
};

module.exports.videoSorter = (path, style) => {
  let resultVideo = []
  const videoStatus = [];
  const myVideo = [];
  for (let i = 0; i < listAll(path).length; i++) {
    const video = listAll(path)[i];
    const isHidden = video.split('')[0] === '.';
    videoStatus.push(isHidden);
    myVideo.push(isHidden ? video.slice(1) : video);
  }
  for (let i = 0; i < myVideo.length; i++) {
    for (let j = 0; j < myVideo.length; j++) {
      const video = myVideo[j];
      const checker = `__${i + 1}__[--${video.split('__[--')[1]}`;
      if (myVideo.includes(checker)) {
        resultVideo.push(`${videoStatus[j] ? '.' : ''}${video}`);
      }
    }
  }
  resultVideo = resultVideo.map((video, i) => {
    const defaultSelected = video.split('')[0] === '.' ? false : true;
    const videoName =
      style === false ?
        `${this.videoDirFormatDecoder(video)}` :
        `(${i + 1}) [ ${this.videoDirFormatDecoder(video)} ]`;
    return {
      checked: defaultSelected,
      name: videoName,
      value: video,
    };
  });

  return resultVideo;
}

module.exports.videoDirCreaterFormater = (name = '') => {
  const d = new Date();
  const dateTime = `${d.getDate()}-${MONTHS[d.getMonth()].slice(
    0,
    3,
  )}-${d.getFullYear()} (${d.getHours()}:${d.getMinutes()}:${d.getSeconds()})`;
  return `__${listAll().length + 1}__[--${name}--]__${dateTime}__`;
};

module.exports.videoDirFormatDecoder = (name = '') => {
  return name.split('__[--')[1].split('--]__')[0];
};
