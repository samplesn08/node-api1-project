const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE
server.listen(5000, () => {
    console.log(`Server is running on port ${port}`)
})