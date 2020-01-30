const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = function(config, env) {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    "@data": resolve("src/data"),
    "@ops": resolve("src/operations"),
    "@utils": resolve("src/utils"),
    "@style": resolve("src/style"),
    "@comp": resolve("src/components"),
    "@depot": resolve('src/components/depot'),
    "@diagram": resolve('src/components/diagram'),
    "@sidebar": resolve('src/components/sidebar'),
    "@common": resolve('src/components/common'),
  });

  return config;
};
