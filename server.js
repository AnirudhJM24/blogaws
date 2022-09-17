const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{

        //console.log('request made');
        //console.log(req);

        //lodash

        const num = _.random(0,20);
        console.log(num);

        const greet = _.once(()=>{
            console.log('greeting only once');
        });

        greet();


        let path = './views/';

        switch(req.url){

            case '/' :
                path += 'index.html';
                res.statusCode = 200;
                break;
            case '/about':
                path+= 'about.html';
                res.statusCode = 200;
                break;
            case '/about-us':
                res.statusCode = 301;
                res.setHeader('Location', '/about');
                res.end();
                break;

            default:
                path += '404.html';
        }



        //send html

        fs.readFile(path, (err, data)=>{
            if (err) {
                console.log(err);
                res.end();
            }else{
                res.write(data);
                res.end();
            }
        });


});

server.listen(3000, 'localhost', ()=>{
    console.log('listening for request on 3000');
});

// loopback address 127.0.0.1 - our own computer

