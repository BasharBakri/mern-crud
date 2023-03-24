const logger = (req, res, next) => {
  req.secretMsg = 'sent from middleware';
  console.log('middleWare check');
  next();
};

module.exports = logger;