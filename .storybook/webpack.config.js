const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      "@utils": resolve("../src/utils"),
      "@style": resolve("../src/style"),
      "@comp": resolve('../src/components'),
      "@depot": resolve('../src/components/depot'),
      "@diagram": resolve('../src/components/diagram'),
      "@sidebar": resolve('../src/components/sidebar'),
      "@common": resolve('../src/components/common'),
    }
  }
};
