var winston = require('winston');
winston.error = true;

const console = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
   
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
  if (process.env.NODE_ENV !== 'production') {
    console.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

console.stream = {
    write: function(message, encoding){
        console.info(message);
        console.debug('========================================================================================================');

    }
};

//debug ตรวจสอบบัค
//info ข้อมูลที่สำคัญ
//error  