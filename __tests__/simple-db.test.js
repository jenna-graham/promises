const fs = require('fs/promises');
const { request } = require('http');
const crypto = require('crypto');
const path = require('path');
const { moveMessagePortToContext } = require('worker_threads');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {
  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('GET:id returns object by id', async () => {
    const cats = {
      name: 'Momo',
      age: 2,
    };
    const id = crypto.randomBytes(8).toString('hex');
    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(cats));
    const db = new SimpleDb(TEST_DIR);
    const result = await db.get(id);
    expect(result).toEqual(cats);
  });

  it('save should save an object', async () => {
    const cats = {
      name: 'Stu',
      age:  1,
    };
    const db = new SimpleDb(TEST_DIR);

    const obj = await db.save(cats);

    expect(await db.get(obj.id)).toEqual({ ...cats, id: expect.any(String) });
  });

  it('getall() should return all objects in directory', async () => {
    const cats = [
      {
        name: 'Eddna',
        age: 2,
      },
      {
        name: 'Ghoul',
        age: 6,
      },
      {
        name: 'Ralph',
        age: 8,
      },
    ];

    const db = new SimpleDb(TEST_DIR);

    cats.forEach(async object => {
      await db.save(object);
    });

    expect(await db.getAll()).toEqual([
      {
        name: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
      },
      {
        name: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
      },
      {
        name: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
      }
    ]);
  });
});
