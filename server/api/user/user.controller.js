'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var crypto = require('crypto');
var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};
exports.confirm = function(req, res, next) {
  var token = req.params.token;
  console.log(token);


  User.find({studentEmailToken: token}, function (err, userRes) {
    if(err) { return handleError(res, err); }
    if(!userRes || userRes.length ==0) { return res.send(404); }
    if(userRes[0]['studentEmail_confirmed']){return res.send("confirmed already yo");}
    userRes[0].studentEmail_confirmed = true;
    userRes[0].save();
    return res.json(userRes[0]['studentEmail_confirmed']);

  });



  //res.send(200);
}
exports.studentEmail = function(req, res, next) {
  var userId = req.user._id;
  var studentEmail = String(req.body.studentEmail);
  console.log(studentEmail);
  var token = crypto.randomBytes(33).toString('hex');


User.findById(userId, function (err, user) {
      user.studentEmail = studentEmail;
      user.studentEmailToken = token;
      user.save();
  });

var emailMessage = "yo confirm your thing at http://localhost:9000/confirm/"+token+"/";

  var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: 'postmaster@mg.nickysemenza.com',
        pass: '5878262d108817e71b5bc0d9df1deac9'
    }
}));
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Taskr U', // sender address
    to: studentEmail, // list of receivers
    subject: 'Welcome to Taskr U', // Subject line
    text: emailMessage, // plaintext body
    html: emailMessage // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});




  res.send(200);
};
/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
