const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  tabWidth: 4,
  useTabs: true
};
