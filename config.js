exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT || 8080;
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL  || 'mongodb://localhost/test-mo-app';
exports.JWT_SECRET = process.env.JWT_SECRET;