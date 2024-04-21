// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.minifierConfig = {
    compress: {
        /*
          The option below removes ALL console statements in production.
          This can also be configured w/ an array of what you want to filter out:
          drop_console: ['log', 'info'] (removes only logs and info, but keeps warn and error intact)
          Reference: https://docs.expo.dev/guides/minify/#remove-console-logs
        */
        drop_console: true,
    },
};

module.exports = config;
