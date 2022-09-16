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
  
  getAll() {
    const cats = [];
    Promise.all(JSON.stringify(fs.readdir(this.dirPath))).then((object) => {
      cats.push(this.get(object.id));
    });
    return cats;
  }
}

module.exports = SimpleDb;
