#!/usr/bin/env node

const inquirer = require('inquirer');
const {
  createChannel,
  useExistedChannel,
  getBuildGithub,
} = require('./config/index.js');
const {channelsLists} = require('./util/index');

inquirer
    .prompt([
      {
        type: 'list',
        name: 'channelChoice',
        message: 'Select the choice?',
        choices: [
          {
            name: 'Use existance channels',
            value: 'old',
            disabled: channelsLists().length === 0,
          },
          {
            name: 'Upload / Update all resource code to github.com',
            value: 'github',
          },
          {
            name: 'Create a new channel',
            value: 'new',
          },
        ],
      },
    ])
    .then((answer) => {
      switch (answer.channelChoice) {
        case 'new':
          createChannel();
          break;
        case 'old':
          useExistedChannel();
          break;
        case 'github':
          getBuildGithub();
          break;
      }
    })
    .catch((err) => {
      if (error.isTtyError) {
        console.log(
            'Prompt couldn\'t be rendered in the current environment',
        );
      } else {
        console.log('Something else went wrong');
      }
    });
