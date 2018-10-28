var User = require('./models/user');
var jogging = require('./models/joggingdata');
var passport = require("./passport");
var crypto = require('crypto');
var Token = require('./models/token');
const Image = require('./models/image')
const multer = require('multer')
const path = require('path')
const UPLOAD_PATH = path.resolve(__dirname, '../public/uploads/avatar_image')
// const upload = multer({
//   dest: UPLOAD_PATH,
//   limits: {fileSize: 1000000, files: 5}
// })
const upload = multer()
var fs = require('fs');

var { generateToken, sendToken } = require('./utils/token.utils');

function getUsers(res) {
    User.find(function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(users); // return all todos in JSON format
    });
};
function getData(res) {
    jogging.find(function (err, joggingdata) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(joggingdata); // return all todos in JSON format
        //console.log("213123",res.json(joggingdata))
    });
};

function gethash(v) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(v).digest("hex");
}
function duplicate(req,res,next) {
    User.find({
        email: req.body.email
    }, function (err, user) {
        console.log(user)
        if (err) {
            res.status(500).send(err); return;
        } else if (user.length>0) {
            res.status(302).send('duplicate'); return;     // This runs.
        } else {
            next();
        }   
    });
}
module.exports = function (app) {

    app.post('/api/image' ,function(req, res) {
        let imageFile = req.files.file; console.log("back file--",imageFile)
        var email = req.body.email;console.log("back email--",req.body.email)
    
        let fileExt = imageFile.name.split('.')[imageFile.name.split('.').length-1];
        var filename = imageFile.name.split('.')[0]+Date.now('yy-mm-dd');
        fs.writeFile(`${UPLOAD_PATH}/${filename}.${fileExt}`, imageFile.data, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
            // res.json({file: `/uploadedFiles/${filename}.${fileExt}`});
        })
        User.updateOne({
            email: req.body.email
        }, {
            avatarurl: `http://localhost:8080/uploads/avatar_image/${filename}.${fileExt}`
        }, function (err, result) {
            if (result) {
                res.send(
                    {
                        avatarurl: `http://localhost:8080/uploads/avatar_image/${filename}.${fileExt}`
                    }
                );
            }
        });
    });   

    app.post('/api/auth/google', passport.authenticate('google-token', {session: false}),  function(req, res, next) {
        console.log("user : ",req.user, ", token : " ,req.body.access_token);
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };
        next();
    }, generateToken, sendToken);

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/users', function (req, res) {
        // use mongoose to get all todos in the database
        getUsers(res);
    });
    app.post('/api/checkuser',function(req,res){
        //console.log(gethash(req.params.password))
        console.log(req.body.email)
        User.find({
            email: req.body.email,
            password: gethash(req.body.password) 
        }, function (err, user) {
            if (err)
                res.send(err);
            if(user.length>0) res.json(user);
            else res.send("incorrect");
        });
    });
    // create todo and send back all todos after creation
    //app.use(duplicate);
    app.post('/api/user',duplicate, function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        //-----save----------
        User.create({
            //email: req.body.email,
            //password: req.body.password
            
            name: req.body.name,
            email: req.body.email,
            password: gethash(req.body.password),
            avatarurl : "http://localhost:8080/uploads/avatar_image/download.jpeg"
        }, function (err, user) {
            if (err){
                console.log(err);
                res.status(302).json(err);
            }else{
                // get and return all the todos after you create another
                //res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(user);
            }
        });
       
    });
    // delete a todo
    app.delete('/api/user/:user_id', function (req, res) {

        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });

      app.post('/api/jogging', function (req, res) {
          console.log(res)
        jogging.create({
            distance: req.body.distance,
            startDate: req.body.startDate,
            endDate :  req.body.endDate,
            commite : req.body.commite
        }, function (err, jogging) {
            if (err){
                //console.log(err);
                res.status(302).send(err);
            }else{
                res.status(200).json(jogging);
            }
        });
       
    });
    app.get('/api/getdata', function (req, res) {
        getData(res)
    });

    app.delete('/api/deletedata/:user_id', function (req, res) {
        jogging.remove({
            _id: req.params.user_id
        }, function (err, jogging) {
            if (err){
                //console.log(err);
                res.send(err);
            }else{
                getData(res);
            }
        });
    });

    app.get('/api/editdata/:user_id', function (req, res) {
        //res.send("dddd"); return;
        var id = req.params.user_id;
        console.log("--------------")
        console.log(id)
        jogging.findById({
            _id: req.params.user_id
        }, function (err, jogging) {
            if (err){
                //console.log(err);
                res.send(err);
            }else{
                res.json(jogging);
            }
        });
    });

    app.put('/api/updatedata/:user_id', function (req, res) {
        console.log(JSON.parse(req.body.data).distance)
        console.log(req.params.user_id)
        jogging.updateOne(
            {
            _id: req.params.user_id
            },
            {
            distance : JSON.parse(req.body.data).distance,
            startDate : JSON.parse(req.body.data).startDate,
            endDate : JSON.parse(req.body.data).endDate,
            commite : JSON.parse(req.body.data).commite
            },
         function (err, jogging) {
            if (err){
                //console.log(err);
                res.send(err);
            }else{
                getData(res);
            }
        });
        
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
      
};
