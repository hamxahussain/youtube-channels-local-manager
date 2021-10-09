const {nameRegex} = require('./../global');
const shell = require('shelljs');
const {
  list,
  listAll,
  videoDirFormatDecoder,
  videoDirCreaterFormater,
} = require('./../util/index');
const inquirer = require('inquirer');

module.exports.createNewVideo = () => {
  inquirer
      .prompt([
        {
          type: 'input',
          name: 'videoName',
          message: 'Enter your video / video_directory name: ',
        },
      ])
      .then((answer) => {
        if (nameRegex.test(answer.videoName)) {
          const baseDir = videoDirCreaterFormater(answer.videoName);
          shell.mkdir(baseDir);
          shell.mkdir(baseDir + '/' + 'CODE');
          shell.mkdir(baseDir + '/' + 'VID');
          shell.mkdir(baseDir + '/' + 'CODE' + '/' + 'resources');
          shell.mkdir(baseDir + '/' + 'CODE' + '/' + 'tests');
          shell.touch(baseDir + '/' + 'CODE' + '/' + 'README.md');
          shell
              .cat(`${__dirname}/templates/README.md`)
              .to(`${baseDir}/CODE/README.md`);
          console.log(`✔️ Video is created sucessfully!`);
          console.log(`: This video is now added to the show list.\n`);
          inquirer
              .prompt([
                {
                  type: 'confirm',
                  name: 'isMakeChanges',
                  message:
                'Do you want to make some changes to the show list?',
                  default: false,
                },
              ])
              .then((answer) => {
                if (answer.isMakeChanges) {
                  this.editShowList();
                }
              });
        } else {
          console.log('* Please specify a name...');
          this.createNewVideo();
        }
      });
};
module.exports.editShowList = () => {
  let resultVideo = [];

  const videoStatus = [];
  const myVideo = [];
  for (let i = 0; i < listAll('./').length; i++) {
    const video = listAll('./')[i];
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
    const videoName = `(${i + 1}) [ ${videoDirFormatDecoder(video)} ]`;
    return {
      checked: defaultSelected,
      name: videoName,
      value: video,
    };
  });

  inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'selectedVideo',
          message: 'Set the show list for your work?',
          choices: resultVideo,
        },
      ])
      .then((answer) => {
        list('./').map((video, i) => {
          shell.mv(video, `.${video}`);
        });
        answer.selectedVideo.map((video, i) => {
          if (video.split('')[0] === '.') {
            shell.mv(video, video.slice(1));
          } else {
            shell.mv(`.${video}`, video);
          }
        });
      });
};
