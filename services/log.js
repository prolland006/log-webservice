fs = require('fs');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

const DESTINATION_MONGODB = 1;
const DESTINATION_FILE = 2;

//params
//const DB_URL = 'mongodb://localhost:27017/log';
//const DB_URL = 'mongodb://login:pwd@ds119368.mlab.com:19368/heroku_3n9bdmc7';
const DB_URL = process.env.MONGODB_URL;
const WRITE_DESTINATION = DESTINATION_MONGODB;

module.exports = class log {

    write(logMessage) {
        console.log('write',logMessage);
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

    readMongo() {
        console.log('read mongo');
        console.log('trying connect to db',DB_URL);
        return new Promise((resolve,reject)=>{
            MongoClient.connect(DB_URL, function(err, db) {
                if(err) { reject(err); }

                //resolve(new Array());
                db.collection('log').find({}).sort({ $natural: -1 }).limit(5000)
                    .toArray(function(err, docs) {
                        console.log("Found the following records");
                        console.dir(docs);
                        resolve(docs);
                    });
            });
        });
    };


    writeMongo(logMessage) {
        console.log('write mongo',logMessage);
        console.log('trying connect to db',DB_URL);
        MongoClient.connect(DB_URL, function(err, db) {
            console.log('connect to db',DB_URL);
            if(err) {
                console.log('error1',err);
                throw err;
            }

            let arr = [];
            arr.push(logMessage);
            db.collection('log').insertMany(arr, function(err, results) {
                db.close();

                if(err) {
                    console.log('error',err);
                    throw err;
                }
            });
        });
    }
}