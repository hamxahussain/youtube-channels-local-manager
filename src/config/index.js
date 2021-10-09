const {createChannel, useExistedChannel} = require('./channelSetup');
const {getBuildGithub} = require('./gitManagement');
module.exports = {
  createChannel,
  useExistedChannel,
  getBuildGithub,
};
