const path = require("path");

module.exports.GIT_YOUTUBE_DIR_NAME = ".git_youtube_channels_resources";
module.exports.YOUTUBE_DIR_FULL = path.join(
	process.env.HOME,
	this.YOUTUBE_DIR_NAME
);
module.exports.GIT_YOUTUBE_DIR_FULL = path.join(
	process.env.HOME,
	this.GIT_YOUTUBE_DIR_NAME
);
module.exports.MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
module.exports.nameRegex = /[^ ][a-zA-Z0-9-_]/g;
