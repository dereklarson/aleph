const path = require("path");

module.exports = {
  //...
  resolve: {
    alias: {
      "@comp": path.resolve(__dirname, '../src/components'),
      "@depot": path.resolve(__dirname, '../src/components/depot'),
      "@diagram": path.resolve(__dirname, '../src/components/diagram'),
      "@sidebar": path.resolve(__dirname, '../src/components/sidebar'),
      "@common": path.resolve(__dirname, '../src/components/common'),
    }
  }
};
