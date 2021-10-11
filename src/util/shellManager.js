const shell = require('shelljs');

const mainList = (path, option) => {
  if (option === 'hidden') {
    return shell.ls('-A', path).map((item, i) => {
      if (typeof item === 'string') {
        if (item.split('')[0] === '.') return item;
      }
    }).filter(item => item !== undefined);
  }

  if (option === true) {
    return shell.ls('-A', path).map((item, i) => {
      if (typeof item === 'string') return item;
    });
  }


  return shell.ls(path).map((item, i) => {
    if (typeof item === 'string') return item;
  });
};

module.exports.list = (path) => mainList(path, false);
module.exports.listAll = (path) => mainList(path, true);
module.exports.listOnlyHidden = (path) => mainList(path, 'hidden');

module.exports.move = ({ from, to }) => {
  shell.mv('-R', from, to);
};
