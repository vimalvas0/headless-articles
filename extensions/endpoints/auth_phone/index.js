const {register} = require('./controllers/auth');
const dotenv = require('dotenv');
dotenv.config({path : '../../../.env'});
const client = require('./models/db');

module.exports = function registerEndpoint(router) {
	router.get('/', (req, res) => res.send('Hello, World!'));
    router.post('/register', register);


    // Handling errors ################################################S
    router.use((err, res, req, next)=>{
        if(err)
        {
            res.json({
                status : "failed",
                "err" : err.message
            });
        }
    });
};

