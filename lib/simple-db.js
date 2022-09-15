const fs = require('fs/promises');
// const path = require('path');
const crypto = require('crypto');

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

  save(obj) {
    const id = crypto.randomBytes(8).toString('hex');
    const cats = { ...obj, id };
    return fs.writeFile(`${this.dirPath}/${id}.json`, JSON.stringify(cats)).then(() => cats);
  }
}

module.exports = SimpleDb;
