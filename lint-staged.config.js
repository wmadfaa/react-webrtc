const config = {
  '.*{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '.*{md,json,js,ts,tsx}': ['prettier --write'],
  '*.svg': (filenames) =>
    filenames.map((filename) => `svgo --config .svgo.yml --input ${filename}`),
};

module.exports = config;
