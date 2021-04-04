const mongoose = require('mongoose');

module.exports = class Database {
    static connect(MONGODB_URI, cb) {
        mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, cb);
    }
};