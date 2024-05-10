const client = require('./db')
const {spawn} = require('child_process');
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json())

app.listen(3000,  () => {
    console.log('Server is Running at port 3000')
})

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
  };

app.use(cors(corsOptions));

client.connect().then(() => {
    console.log('Database connected')
})

const AuthenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    // console.log(authHeader)
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[2];
      console.log(jwtToken)
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.username = payload.username;
          next();
        }
      });
    }
  };

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/getUsers', cors(corsOptions) ,AuthenticateToken, (req, res) => {
    const authHeader = req.headers["authorization"];
    const username = authHeader.split(' ')[1]
    console.log(username)
    client.query(`Select * from userinfo where uname = '${username}'`, (err, result) => {
        if (!err){
            res.send(result.rows)
        }
    })

    client.end
})

app.post('/registration', cors(corsOptions) , async (req, res) => {
    const {name, uname, password, email, info} = req.body
    const {age, PhoneNumber, city, State, PIN} = info
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await client.query(`Select * from userinfo where uname = '${uname}'`)
    console.log(result.rowCount)

    if (result.rowCount === 0){
        const result1 = await client.query(`insert into userinfo (name, uname, password, email, info) values ('${name}', '${uname}', '${hashedPassword}', '${email}', '{"age": ${age}, "PhoneNumber": ${PhoneNumber}, "city": "${city}", "State": "${State}", "PIN": ${PIN}}')`)
        if (result1.rowCount === 1){
            res.send(JSON.stringify('Registration Successfull'))
        }
    }else{
        res.send(JSON.stringify('User already exists'))
    }

    /*

    client.query(`Insert into userinfo (name, uname, password, email, info) values ('${name}', '${uname}', '${hashedPassword}', '${email}', '{"age": ${age}, "PhoneNumber": ${PhoneNumber}, "city": "${city}", "State": "${State}", "PIN": ${PIN}}')`, (err, result) => {
    if(!err){
        console.log(1)
        res.send(JSON.stringify("Registration Successfull"))
    }
        })
    */
    client.end
})

app.post('/login', cors(corsOptions) , async (req, res) => {
    const {uname, password} = req.body

    const result = await client.query(`Select * from userinfo where uname = '${uname}'`)
    if (result.rowCount === 0){
        res.send('User not registered')
    }else{
        const hashPass = result.rows[0].password
        const isPassMatch = await bcrypt.compare(password, hashPass)
        if (isPassMatch === true){
            const payload = {
                username: uname,
            };
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
            res.send({ jwtToken });
        }
        else{
            res.send(400)
            res.send('Invalid Password')
        }
    }

    client.end
})



app.get('/typogame', cors(corsOptions), (req, res) => {
    let dataToSend;
    // spawn new child process to call the python script 
    // and pass the variable values to the python script
    const python = spawn('python', ['C:/Users/prana/OneDrive/Documents/Python_Scripts/readFile.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });
})

app.get('/smileGame', cors(corsOptions), (req, res) => {
    const python = spawn('python', ['C:/Users/prana/OneDrive/Documents/Python_Scripts/FER_Opencv.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });
})