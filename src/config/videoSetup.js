const { nameRegex } = require('./../global');
const shell = require('shelljs');
const {
  list,
  listAll,
  exit,
  videoSorter,
  videoDirCreaterFormater,
  symbols,
} = require('./../util/index');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require("path")

module.exports.createNewVideo = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'videoName',
        message: 'Enter your video / video_directory name: 📹 ',
      },
    ])
    .then((answer) => {
      if (nameRegex.test(answer.videoName)) {
        const baseDir = videoDirCreaterFormater(answer.videoName);
        shell.mkdir(baseDir);
        shell.mkdir(path.join(baseDir, 'CODE'));
        shell.mkdir(path.join(baseDir, 'VID'));
        shell.mkdir(path.join(baseDir, 'CODE', 'resources'));
        shell.mkdir(path.join(baseDir, 'CODE', 'tests'));
        shell.touch(path.join(baseDir, 'CODE', 'README.md'));
        shell
          .cat(path.join(__dirname, 'templates', 'README.md'))
          .to(path.join(baseDir, 'CODE', 'README.md'));
        console.log(
          symbols().success,
          'Video is created ',
          chalk.greenBright.italic(' sucessfully!'));
        console.log(
          symbols().warning,
          'This video is now added to the ',
          chalk.bgGrey.greenBright.italic(' show list ') + '\n');
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'isMakeChanges',
              message:
                'Do you want to make some changes to the ' +
                chalk.bgGrey.greenBright.italic(' show list ') +
                '? 🛠️ ',
              default: false,
            },
          ])
          .then((answer) => {
            if (answer.isMakeChanges) {
              this.editShowList();
            } else {
              exit(0);
            }
          });
      } else {
        console.log(
          symbols().error,
          ' Please specify a another name, ',
          chalk.red('this name is not valid?'));
        this.createNewVideo();
      }
    });
};
module.exports.editShowList = () => {
  let resultVideo = videoSorter()
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'selectedVideo',
        message:
          'Set the ' +
          chalk.bgGrey.greenBright.italic(' show list ') +
          ' for your work? 🔧 ',
        choices: resultVideo,
      },
    ])
    .then((answer) => {
      list().map((video, i) => {
        shell.mv(video, `.${video}`);
      });
      answer.selectedVideo.map((video, i) => {
        if (video.split('')[0] === '.') {
          shell.mv(video, video.slice(1));
        } else {
          shell.mv(`.${video}`, video);
        }
      });
      exit(0);
    });
};
