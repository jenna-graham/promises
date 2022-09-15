const fs = require('fs/promises');
const path = require('path');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  get(id) {
    const path = `${this.dirPath}/${id}.json`;
    return fs.readFile(path).then((cats) => {
      return JSON.parse(cats.toString());
    });
  }
}

module.exports = SimpleDb;
