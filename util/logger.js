var winston = require('winston');

var console = module.exports = new winston.console({
    transports: [
        // new winston.transports.File({
        //     level: 'warn',
        //     filename: './logs/logs.log',
        //     handleExceptions: true,
        //     json: true,
        //     maxsize: 5242880, //5MB
        //     maxFiles: 5,
        //     colorize: false
        // }),
        new winston.transports.Console({
            level: 'debug',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
});

console.stream = {
    write: function(message, encoding){
        console.info(message);
        console.debug('========================================================================================================');

    }
};

//debug ตรวจสอบบัค
//info ข้อมูลที่สำคัญ
//error  