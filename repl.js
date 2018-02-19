var repl = require("repl").start({}),
    promisify = require("repl-promised").promisify,
    db = require(__dirname, 'db.js');
promisify(repl);
