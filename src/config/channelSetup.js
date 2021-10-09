const inquirer = require('inquirer');
const shell = require('shelljs');
const {YOUTUBE_DIR, nameRegex} = require('./../global');
const {channelsLists, list, listAll} = require('../util/index');
const {createNewVideo, editShowList} = require('./videoSetup');

const existChannelSetting = () => {
  const videosList = listAll('./');
  inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVideoSetup',
          message: 'Go with the option, given below?',
          choices: [
            {
              name: 'Create a new video',
              value: 'new',
            },
            {
              name: 'Edit videos show list',
              value: 'edit',
              disabled: videosList.length === 0,
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
        }
      });
};
module.exports.createChannel = () => {
  shell.cd(YOUTUBE_DIR);
  inquirer
      .prompt([
        {
          type: 'input',
          name: 'newChannelName',
          message: 'Type your new channel name: ',
        },
      ])
      .then((answer) => {
        if (nameRegex.test(answer.newChannelName)) {
          if (list('./').includes(answer.newChannelName)) {
            console.log(
                '* This channel is already exists, Try another name?',
            );
            this.createChannel();
          } else {
            const dir = answer.newChannelName;
            shell.mkdir(dir);
            shell.mkdir(dir + '/' + 'Designs');
            shell.mkdir(dir + '/' + 'Tutorials');
            shell.cd(`${dir}/Tutorials`);
            console.log(
                '✔️ Your new Channel is created successfully!\n',
                ': Now You are in "' + dir + '" channel.\n',
            );
            this.useExistedChannel(true);
          }
        } else {
          console.log('* Please specify a name...');
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
            message: 'Choose your channel?',
          },
        ])
        .then((answer) => {
          const channel = answer.channel;
          shell.cd(`${YOUTUBE_DIR}/${channel}/Tutorials`);
          existChannelSetting(channel);
        });
  }
};
