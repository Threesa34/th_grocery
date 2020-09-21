// Users.js
var jwt = require('jsonwebtoken');
var express = require('express');
var nodemailer = require('nodemailer');
var connection = require('../config/connection');
var cryptconf = require('../config/crypt.config');
var fs = require('fs');
var app = express();
var mailer = require('../config/mailer.config');
// var logger = require('../config/logger');
var env = require('../config/env');
var moment = require('moment');

app.set('superSecret', env.jwt_sec); // secret variable

var verificationObject = [{}];

function getvaluesinObject(passedval) {
    var charindex = passedval.indexOf("=");
    var strindex = passedval.length;
    var field = passedval.substring(0, charindex).trim();
    var value = passedval.substring(charindex + 1, strindex);

    verificationObject[0][field] = value.trim();
};

function generaterandomPassword()
{
                var passwordtxt = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+new Date();
                        for (var i = 0; i < 6; i++) {
                            passwordtxt += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        if(passwordtxt.length == 6)
                        {
                            //passwordtxt
                            return cryptconf.encrypt('321');
                        }
}

function sendMail(mailbody)
{
     const mailOptions = {
         from: cryptconf.decrypt(env.sendermail), // sender address
         to: mailbody.reciver, // list of receivers
         subject: mailbody.subject, // Subject line
         html: mailbody.content // plain text body
     };


     mailer.transporter.sendMail(mailOptions, function (err, info) {
         if(err)
           console.log(err)
         else
           console.log(info);
      });
}


module.exports = {

    authenticateEmployee: function(req, res)
    {
        connection.acquire(function(err, con){
            con.query('SELECT `id`,`name`,`role`,`locationid`,`companyid`,`firstlogin` FROM `employees` WHERE (`mobile1` = ? OR `email` = ?) AND `password` = ?',[req.body.mobile,req.body.mobile, cryptconf.encrypt(req.body.password)], function(err,result){
                if(err)
                {
                    res.send(
                        {
                            status:0,
                            type:'error',
                            title:'Oops!',
                            message:'Something went wrong'
                        }
                    );
                }
                else
                {
                    if(result.length == 1)
                    {
                        if(result[0].role != 'Superadmin')
                        {
                            con.query('SELECT `status` FROM `company` WHERE `id` = ?',[result[0].companyid], function(err,activecompany){
                                if(err)
                                {
                                    res.send(
                                        {
                                            status:0,
                                            type:'error',
                                            title:'Oops!',
                                            message:'Something went wrong'
                                        }
                                    );
                                }
                                else
                                {
                                    if(activecompany.length >0 && activecompany[0].status == 1)
                                    {
                                        var payload = {
                                            logedinuser: result[0]
                                        }
                                        var token = jwt.sign(payload, app.get('superSecret'), {
                                            expiresIn: 86400 // expires in 24 hours = 86400    -  28800
                                        });

                                        res.send(
                                            {
                                                success:true,
                                                firstlogin: result[0].firstlogin,
                                                role: result[0].role,
                                                token:token
                                            }
                                        );
                                    }
                                    else
                                    {
                                        res.send(
                                        {
                                            success:false,
                                            type:'error',
                                            title:'Faied to signin',
                                            message:'Company id is deactivated, please contact to admin for details.'
                                        }
                                        );
                                    }
                                }
                            });
                        }
                        else
                        {
                            var payload = {
                                logedinuser: result[0]
                            }
                            var token = jwt.sign(payload, app.get('superSecret'), {
                                expiresIn: 86400 // expires in 24 hours = 86400    -  28800
                            });

                            res.send(
                                {
                                    success:true,
                                    firstlogin: result[0].firstlogin,
                                    role: result[0].role,
                                    token:token
                                }
                            );
                        }
                       
                    }
                    else
                    {
                        res.send(
                            {
                                success:false,
                                type:'error',
                                title:'Faied to signin',
                                message:'User details does not match.'
                            }
                            );
                    }
                }
            });
            con.release();
        });
    },
    setNewPassword: function(req, res)
    {
        if (req.decoded.success == true) {

            connection.acquire(function(err, con){
                con.query('UPDATE employees SET password = ?, firstlogin = 1 WHERE id = ?',[cryptconf.encrypt(req.body.new_password),req.decoded.logedinuser.id],function(err, result){
                    if(err)
                    {
                        res.send({
                            status:0,
                            type:'error',
                            title:'Error',
                            message:'Something went wrong.'
                        });
                    }
                    else
                    {
                        res.send({
                            status:1,
                            type:'success',
                            title:'Done',
                            message:'password updated successfully.'
                        })
                    }
                });
                con.release();
            });
        }
        else
        {
            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });
        }
    },

    getUserDetails: function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT *,CONCAT("http://localhost:8018/uploads/employee/",profilepic) as profilepic FROM `employees` WHERE `id` = '+req.params.userid, function(err, result){
                if(err)
                {
                    res.send({
                        status:0,
                        type:'error',
                        title:'Oops!',
                        message:'Somthing went wrong.'
                    })
                }
                else
                {
                    res.send(result.length> 0 ? result[0]:result)
                }
            });
        });
    }
    else
        {
            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });
        }
    },

    getUsersList: function(req, res)
    {
        if (req.decoded.success == true) {

            connection.acquire(function(err, con){
                if(req.decoded.logedinuser.role == 'Superadmin')
                {
                    var sql = 'SELECT `id`,`name`,CONCAT(`mobile1`,(CASE WHEN `mobile2` IS NULL OR `mobile2` = "" THEN "" ELSE CONCAT(" / ",`mobile2`) END )) AS mobiles, `email`, `role`, (SELECT company.name FROM company WHERE company.id = employees.companyid) as company_name FROM `employees`'
                }
                else
                {
                    var sql = 'SELECT `id`,`name`,CONCAT(`mobile1`,(CASE WHEN `mobile2` IS NULL OR `mobile2` = "" THEN "" ELSE CONCAT(" / ",`mobile2`) END )) AS mobiles, `email`, `role`, (SELECT company.name FROM company WHERE company.id = employees.companyid) as company_name FROM `employees` WHERE companyid = '+req.decoded.logedinuser.companyid
                }
                con.query(sql,function(err, result){
                    if(err)
                    {
                        res.send({
                            status:0,
                            type:'error',
                            title:'Error',
                            message:'Something went wrong.'
                        });
                    }
                    else
                    {
                        res.send(result)
                    }
                });
                con.release();
            });

        }
        else
        {
            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });
        } 
    },

    saveUserDetails: function(req, res)
    {
        if (req.decoded.success == true) {

            connection.acquire(function(err, con){
                
                var userDetails = JSON.parse(req.body.userDetails);

                if(req.file)
                {
                    userDetails.profilepic =  req.file.filename;
                }
    
                if(userDetails.id != undefined)
                {
    
                     userDetails.profilepic =  userDetails.profilepic.replace(/http:\/\/localhost:8018\/uploads\/employee\//g, "");
                     userDetails.dob =  moment(new Date(userDetails.dob)).format("YYYY-MM-DD");
                    userDetails.doj =  moment(new Date(userDetails.doj)).format("YYYY-MM-DD");
                     con.query('UPDATE `employees` SET ? WHERE id = ?', [userDetails, userDetails.id], function(err, result){
                        if(err)
                        {
                            res.send({
                                status:0,
                                type:'error',
                                title:'Error',
                                message:'Something went wrong.'
                            });
                        }
                        else
                        {
                            res.send({
                                status:1,
                                type:'success',
                                title:'Done',
                                message:'Employee details updated successfully.'
                            })
                        }
                    });
                }    
                else{

                    userDetails.password = generaterandomPassword();
                    userDetails.createdby = req.decoded.logedinuser.id;
                    userDetails.companyid = req.decoded.logedinuser.companyid;
                    userDetails.dob =  moment(new Date(userDetails.dob)).format("YYYY-MM-DD");
                    userDetails.doj =  moment(new Date(userDetails.doj)).format("YYYY-MM-DD");
                    

                    con.query('INSERT INTO `employees` SET ?', userDetails, function(err, result){
                        if(err)
                        {
                            res.send({
                                status:0,
                                type:'error',
                                title:'Error',
                                message:'Something went wrong.'
                            });
                        }
                        else
                        {

                            {
                                var mailbody = {
                                 reciver:userDetails.email,
                                 subject:"One Time Password",
                                 content: 'Dear ' + userDetails.name + '<br><br><br><h1 style="font-weight:bold;text-align:center;">' + cryptconf.decrypt(userDetails.password) + '</h1> <br> <p>enter this as a  password for the app.<br><br><br><br> <div style="float:left;text-align:left;">Thanks, <br> Admin <br> (L.N. software Pvt. Ltd.)</div></p>' // plain text body
                                }
                                sendMail(mailbody)
                            }
                            res.send({
                                status:1,
                                type:'success',
                                title:'Done',
                                message:'Employee details saved successfully.'
                            })
                        }
                    });
                }
               
                con.release();
            });

        }
        else
        {
            res.send({
                success: false,
                type: "error",
                title: "Oops!",
                message: 'Invalid token.',
            });
        } 
    },
};

