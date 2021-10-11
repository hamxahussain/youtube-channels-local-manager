const inquirer = require('inquirer');
const shell = require('shelljs');
const { nameRegex, YOUTUBE_DIR_FULL } = require('./../global');
const {
  channelsLists,
  list,
  listAll,
  exit,
  symbols,
} = require('../util/index');
const { createNewVideo, editShowList } = require('./videoSetup');
const chalk = require('chalk');
const path = require("path")

const existChannelSetting = () => {
  const videosList = listAll();
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectedVideoSetup',
        message: 'Go with the option, given below? 📌 ',
        choices: [
          {
            name: 'Create a ' + chalk.yellowBright.dim('new video'),
            value: 'new',
          },
          {
            name:
              'Edit videos ' +
              chalk.bgGrey.greenBright.italic(' show list '),
            value: 'edit',
            disabled: videosList.length === 0,
          },
          {
            name: 'Do nothing just ' + chalk.redBright('exit app'),
            value: 'exit',
          },
        ],
      },
    ])
    .then((ans) => {
      switch (ans.selectedVideoSetup) {
        case 'new':
          createNewVideo();
          break;
        case 'edit':
          editShowList();
          break;
        case 'exit':
          exit(0);
          break;
      }
    });
};
module.exports.createChannel = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newChannelName',
        message: 'Type your new channel name: 🍕 ',
      },
    ])
    .then((answer) => {
      if (nameRegex.test(answer.newChannelName)) {
        if (list().includes(answer.newChannelName)) {
          console.log(
            symbols().error,
            chalk.red(
              chalk.redBright(' This channel is already exists, '),
            ),
            ' Try another name ?\n',
          );
          this.createChannel();
        } else {
          const dir = answer.newChannelName;
          shell.mkdir(path.join(dir));
          shell.mkdir(path.join(dir, 'Designs'));
          shell.mkdir(path.join(dir, 'Tutorials'));
          shell.cd(path.join(dir, 'Tutorials'));
          console.log(
            symbols().success,
            'Your new Channel is created ',
            chalk.greenBright.italic('successfully!'),
          );
          console.log(
            symbols().info,
            'Now You are in "' +
            chalk.whiteBright.underline(dir) +
            '" channel.\n',
          )
          this.useExistedChannel(true);
        }
      } else {
        console.log(
          symbols().error,
          ' Please specify a another name, ',
          chalk.red('this name is not valid?'),
        );
        this.createChannel();
      }
    });
};
module.exports.useExistedChannel = (isCameFromNewChannel) => {
  if (isCameFromNewChannel) {
    existChannelSetting();
  } else {
    inquirer
      .prompt([
        {
          type: 'list',
          choices: channelsLists(),
          name: 'channel',
          message: 'Choose your channel? 🛬 ',
        },
      ])
      .then((answer) => {
        const channel = answer.channel;
        shell.cd(path.join(YOUTUBE_DIR_FULL, channel, 'Tutorials'));
        existChannelSetting(channel);
      });
  }
};
