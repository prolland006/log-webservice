fs = require('fs');

const DESTINATION_MONGODB = 1;
const DESTINATION_FILE = 2;

//params
//const DB_URL = 'mongodb://localhost:27017/log';
const DB_URL = 'mongodb://guest:guest@ds119548.mlab.com:19548/logdb';
const WRITE_DESTINATION = DESTINATION_MONGODB;

module.exports = class log {

    write(logMessage) {
        if (WRITE_DESTINATION == DESTINATION_MONGODB) {
            this.writeMongo(logMessage);
        } else {
            this.writeFile(logMessage);
        }
    }

    writeFile(logMessage) {
        try {
            fs.accessSync('log', fs.F_OK);
        } catch (e) {
            fs.mkdirSync("log");
        }

        let today = new Date();
        let filename = `log/log_${today.getFullYear()}.${today.getMonth()}.${today.getDay()}.log`;

        let write_msg = `${logMessage.timestamp} ${logMessage.level} ${logMessage.message}\r\n`;
        fs.appendFile(filename, write_msg,(err) => {
            if (err) throw err;
        });
    }

    writeMongo(logmessage) {
        let MongoClient = require('mongodb').MongoClient;
        let url = DB_URL;

        MongoClient.connect(url, function(err, db) {
            if(err) { return cb(err, null); }

            let arr = [];
            arr.push(logmessage);
            db.collection('log').insertMany(arr, function(err, results) {
                db.close();

                if(err) throw err;
            });
        });
    }
}