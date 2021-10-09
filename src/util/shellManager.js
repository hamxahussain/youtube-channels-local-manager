const shell = require('shelljs');

const mainList = (path, option) => {
  if (option === 'hidden') {
    shell.ls('-A', path).map((item, i) => {
      if (typeof item === 'string') {
        return item.split('')[0] === '.' && item;
      }
    });
  }
  return shell.ls(option === true ? '-A' : '', path).map((item, i) => {
    if (typeof item === 'string') return item;
  });
};

module.exports.list = (path) => mainList(path);
module.exports.listAll = (path) => mainList(path, true);
module.exports.listOnlyHidden = (path) => mainList(path, 'hidden');

module.exports.move = ({from, to}) => {
  shell.mv('-R', from, to);
};
