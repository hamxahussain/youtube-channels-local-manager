#!/usr/bin/env node

const inquirer = require("inquirer");
const {
	createChannel,
	useExistedChannel,
	getBuildGithub,
} = require("./config/index.js");
const { channelsLists, symbols, listAll, exit } = require("./util/index");
const { YOUTUBE_DIR_NAME } = require("./global");
const shell = require("shelljs");
const chalk = require("chalk");

if (process.env.HOME) shell.cd(process.env.HOME);
else {
	console.log(
		symbols().error,
		"Can't find HOME Variable! before your run this app, Please set the ",
		chalk.red.underline("HOME"),
		" variable as a your",
		chalk.grey.italic("environmental Variable"),
		"."
	);
	console.log(chalk.bgCyanBright("\nGoodbye 👋!\n"));
	process.exit(1);
}

if (
	listAll().includes(YOUTUBE_DIR_NAME) ||
	listAll().includes("." + YOUTUBE_DIR_NAME)
) {
	shell.cd(YOUTUBE_DIR_NAME);
} else {
	shell.mkdir(YOUTUBE_DIR_NAME);
	shell.cd(YOUTUBE_DIR_NAME);
}

inquirer
	.prompt([
		{
			type: "list",
			name: "channelChoice",
			message: "Select the choice? ✈️ ",
			choices: [
				{
					name:
						"Open " + chalk.yellowBright.dim("existance channels"),
					value: "old",
					disabled: channelsLists().length === 0,
				},
				{
					name:
						"Upload / Update all " +
						chalk.yellowBright.dim("resources to github.com"),
					value: "github",
					disabled: channelsLists().length === 0,
				},
				{
					name: "Show all",
					value: "show",
					disabled: channelsLists().length === 0,
				},
				{
					name: "Create a " + chalk.yellowBright.dim("new channel"),
					value: "new",
				},
			],
		},
	])
	.then((answer) => {
		switch (answer.channelChoice) {
			case "new":
				createChannel();
				break;
			case "old":
				useExistedChannel();
				break;
			case "github":
				getBuildGithub();
				break;
			case "show":
				console.clear();
				exit(1);
				break;
		}
	})
	.catch((error) => {
		if (error.isTtyError) {
			console.log(
				"Prompt couldn't be rendered in the current environment"
			);
		} else {
			console.log("Something else went wrong");
			console.log(error);
		}
	});
