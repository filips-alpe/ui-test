// @ts-check
const { withBlitz } = require("@blitzjs/next");

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.ui.com",
        port: "",
        pathname: "/fingerprint/**",
      },
    ],
  },
};

module.exports = withBlitz(config);
