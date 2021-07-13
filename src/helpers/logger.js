const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, printf } = format;

const options = {
	file: {
		level: 'info',
		filename: './logs/app.log',
		handleExceptions: true,
		json: true,
		maxsize: 5242880,
		colorize: false,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};

const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
	levels: config.npm.levels,
	format: combine(timestamp(), myFormat),
	transports: [
		new transports.File(options.file, timestamp),
		new transports.Console(options.console),
	],
	exitOnError: false,
});

module.exports = logger;
