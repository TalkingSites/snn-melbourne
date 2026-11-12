// Everything comes from the spaceclub package; this site's own settings are in spaceclub.json.
module.exports = (eleventyConfig) => {
  const config = require("spaceclub")(eleventyConfig);
  // Pages are Markdown, so a block's HTML must have no blank lines or Markdown splits it up
  const { markSafe } = require("nunjucks").runtime;
  eleventyConfig.addFilter("tight", (html) => markSafe(String(html).replace(/\n\s*\n/g, "\n")));
  return config;
};
