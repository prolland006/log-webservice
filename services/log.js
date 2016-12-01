fs = require('fs');

module.exports = class log {

    write(logMessage) {
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
}