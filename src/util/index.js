const { list, move, listAll, listOnlyHidden } = require("./shellManager");
const { YOUTUBE_DIR_FULL } = require("./../global");
const chalk = require("chalk");
const path = require("path");
const {
	channelsLists,
	videoDirCreaterFormater,
	videoDirFormatDecoder,
	videoSorter,
} = require("./youtube");
const shell = require("shelljs");

const exit = (errorType = 0) => {
	console.log("");
	console.log(chalk.greenBright.inverse("        ALL DONE 🎉 \n"));

	console.log(
		symbols().info,
		"[ Press ",
		chalk.grey.underline("CTRL"),
		"/",
		chalk.grey.underline("Command"),
		" + ",
		chalk.grey.underline("Left-Click"),
		" to open the path location. ]\n"
	);
	console.log(
		symbols().success,
		"Main Directory Path: ",
		chalk.blueBright("file://" + YOUTUBE_DIR_FULL)
	);

	console.log(symbols().success, "All Channels Paths: ");
	list(YOUTUBE_DIR_FULL).map((channel, i) => {
		const channelName = asLink(channel);
		console.log(
			"   ",
			symbols().success,
			channel + ": ",
			chalk.blueBright(
				"file://" + path.join(YOUTUBE_DIR_FULL, channelName)
			)
		);
		const videos = videoSorter(
			path.join(YOUTUBE_DIR_FULL, channel, "Tutorials")
		).map((video, i) => {
			return {
				value: asLink(video.value),
				name: video.name,
				checked: video.checked,
			};
		});
		videos.map((video, i) => {
			console.log(
				"      ",
				`${video.checked ? symbols().success : symbols().warning}`,
				chalk.cyan(`${video.name}: `),
				chalk.blueBright[!video.checked ? "grey" : "blueBright"](
					`${video.checked ? "file://" : ""}${path.join(
						`${shell.pwd()}`,
						channel,
						"Tutorials",
						`${video.value}`
					)}`
				)
			);
		});
	});

	console.log(chalk.bgCyanBright.whiteBright("\n      Goodbye 👋!!! \n"));
	process.exit(errorType);
};

const symbols = (color) => {
	const main = {
		info: chalk[color || "blue"]("ℹ"),
		success: chalk[color || "green"]("✔"),
		warning: chalk[color || "yellowBright"]("⚠"),
		error: chalk[color || "red"]("✖"),
	};

	const fallback = {
		info: chalk[color || "blue"]("i"),
		success: chalk[color || "green"]("√"),
		warning: chalk[color || "yellow"]("‼"),
		error: chalk[color || "red"]("×"),
	};

	return isUnicodeSupported() ? main : fallback;
};

const isUnicodeSupported = () => {
	if (process.platform !== "win32") {
		return process.env.TERM !== "linux"; // Linux console (kernel)
	}

	return (
		Boolean(process.env.CI) ||
		Boolean(process.env.WT_SESSION) || // Windows Terminal
		process.env.ConEmuTask === "{cmd::Cmder}" || // ConEmu and cmder
		process.env.TERM_PROGRAM === "vscode" ||
		process.env.TERM === "xterm-256color" ||
		process.env.TERM === "alacritty"
	);
};

const asLink = (string = "") => {
	let tester = [" ", "[", "]", ":"];
	let testerVal = ["%20", "%5B", "%5D", "%3A"];
	return string
		.split("")
		.map((item) => {
			if (item === tester[0]) return testerVal[0];
			else if (item === tester[1]) return testerVal[1];
			else if (item === tester[2]) return testerVal[2];
			else if (item === tester[3]) return testerVal[3];
			else return item;
		})
		.join("");
};

module.exports = {
	channelsLists,
	list,
	move,
	videoDirFormatDecoder,
	listAll,
	listOnlyHidden,
	videoDirCreaterFormater,
	exit,
	videoSorter,
	isUnicodeSupported,
	symbols,
};
