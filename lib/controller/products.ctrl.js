var connection = require('../config/connection');
const fs = require("fs");
var moment = require('moment');

function DeleteFileFromDirectory(filepath)
{

    console.log(filepath);
        fs.unlink(filepath, function(err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully deleted the file.")
        }
        })
}

module.exports = {

    getUnitsList: function(req, res)
    {
        var unts = ['gm','kg','ml','l',]
            res.send(unts);
    },

    // MANUFACTURELS
    getManufacturelsList:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`,`name`,`address` FROM `manufacturers` WHERE `companyid` = ?',[req.decoded.logedinuser.companyid], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    getmanufacturelDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT * FROM `manufacturers` WHERE `id` = ?',[req.params.id], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    saveManufacturelDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
                if(req.body.id != undefined && req.body.id > 0)
                {
            conn.query('UPDATE `manufacturers` SET ? WHERE `id` = ?',[req.body, req.body.id], function(err, result){
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
                    res.send({
                        status:1,
                        type:'success',
                        title:'Done',
                        message:'Manufacturel details updated successfully.'
                    })
                }
            });
        }
        else
        {
            req.body.companyid = req.decoded.logedinuser.companyid;
            req.body.createdby = req.decoded.logedinuser.id;
            conn.query('INSERT INTO `manufacturers` SET ?',req.body, function(err, result){
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
                    res.send({
                        status:1,
                        type:'success',
                        title:'Done',
                        message:'Manufacturel details saved successfully.'
                    })
                }
            });
        }
            conn.release();
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


    // CATAGORIES
    getCatagoriesList:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`,`name` FROM `categories` WHERE `companyid` = ?',[req.decoded.logedinuser.companyid], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    getCatagoryDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT * FROM `categories` WHERE `id` = ?',[req.params.id], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    saveCatagoryDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
                if(req.body.id != undefined && req.body.id > 0)
                {
            conn.query('UPDATE `categories` SET ? WHERE `id` = ?',[req.body, req.body.id], function(err, result){
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
                    res.send({
                        status:1,
                        type:'success',
                        title:'Done',
                        message:'Catagory details updated successfully.'
                    })
                }
            });
        }
        else
        {
            req.body.companyid = req.decoded.logedinuser.companyid;
            req.body.createdby = req.decoded.logedinuser.id;
            conn.query('INSERT INTO `categories` SET ?',req.body, function(err, result){
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
                    res.send({
                        status:1,
                        type:'success',
                        title:'Done',
                        message:'Catagory details saved successfully.'
                    })
                }
            });
        }
            conn.release();
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


    // PRODUCTS
    getProductsList:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`,`name`,(SELECT categories.name FROM categories WHERE categories.id = products.catagoryid) as category, (SELECT manufacturers.name FROM manufacturers WHERE manufacturers.id = products.manufacturerid) as manufacturel, (CASE WHEN status = 0 THEN "Deactive" ELSE "Active" END) as _status FROM `products` WHERE `companyid` = ?',[req.decoded.logedinuser.companyid], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    getProductDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT * FROM `products` WHERE `id` = ?',[req.params.id], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    saveProductDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
                if(req.body.id != undefined && req.body.id > 0)
                {
            conn.query('UPDATE `products` SET ? WHERE `id` = ?',[req.body, req.body.id], function(err, result){
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
                    res.send({
                        status:1,
                        type:'success',
                        title:'Done',
                        message:'Catagory details updated successfully.'
                    })
                }
            });
        }
        else
        {
            req.body.companyid = req.decoded.logedinuser.companyid;
            req.body.createdby = req.decoded.logedinuser.id;
            conn.query('INSERT INTO `products` SET ?',req.body, function(err, result){
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
                    res.send({
                        status:1,
                        type:'success',
                        title:'Done',
                        message:'Catagory details saved successfully.'
                    })
                }
            });
        }
            conn.release();
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

    // PRODUCT UNITS
    getProductUnitsList:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`, (SELECT products.name FROM products WHERE products.id = product_units.productid LIMIT 1) AS product_name,CONCAT(`qty`,"",`unit`) AS product_unit,FORMAT(`mrp`,2) AS mrp,FORMAT(`sell_price`,2) as sell_price,(CASE WHEN status = 0 THEN "Deactive" ELSE "Active" END) as _status FROM `product_units` WHERE `companyid` = ?',[req.decoded.logedinuser.companyid], function(err, result){
                if(err)
                {
                    console.log(err)
                    res.send({
                        status:0,
                        type:'error',
                        title:'Oops!',
                        message:'Somthing went wrong.'
                    })
                }
                else
                {
                    res.send(result);
                }
            });
            conn.release();
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

    getProductUnitDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT * FROM `product_units` WHERE `id` = ?',[req.params.id], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    getProductUnitImages:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`, CONCAT("http://localhost:8018/uploads/products/",`filename`) as product_img, filename FROM `product_images` WHERE `unitid` = ?',[req.params.id], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    deleteProductImage:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('DELETE FROM `product_images` WHERE `id` = ?',[req.body.id], function(err, result){
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

            
                    DeleteFileFromDirectory("./app/uploads/products/"+req.body.filename);

                    res.send({
                        status:1,
                        type:'success',
                        title:'Done',
                        message:'Product image deleted successfully.'
                    })
                }
            });
            conn.release();
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

    saveProductUnitDetails: function(req, res)
    {
        if (req.decoded.success == true) {
            productUnitDetails = JSON.parse(req.body.productUnitDetails);
            if(productUnitDetails.id != undefined && productUnitDetails.id > 0)
            {
                connection.acquire(function(err, conn){

                    conn.query('UPDATE `product_units` SET ? WHERE `id` = ?',[productUnitDetails, productUnitDetails.id], function(err, result){
                        if(err)
                        {
                            console.log(err)
                            res.send({
                                status:0,
                                type:'error',
                                title:'Oops!',
                                message:'Somthing went wrong.'
                            })
                        }
                        else{

                            if(req.files != undefined && req.files.length > 0)
                            {
                                var ss = '';

                                req.files.map(function(val, index){
                                    ss = ss+'("'+val.filename+'",'+productUnitDetails.id+','+req.decoded.logedinuser.id+','+req.decoded.logedinuser.companyid+'),';
                                });
                                ss = ss.substring(0,ss.length - 1);

                                conn.query('INSERT INTO `product_images`(`filename`, `unitid`, `createdby`, `companyid`) VALUES '+ss, function(err, result){
                                    if(err)
                                    {
                                        res.send({
                                            status:0,
                                            type:'error',
                                            title:'Oops!',
                                            message:'Something went wrong, \n Failed to save product images.'
                                        })
                                    }
                                    else
                                    {
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done',
                                            message:'Product unit details updated successfully.'
                                        })
                                    }
                                });
                            }
                            else
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done',
                                    message:'Product unit details updated successfully.'
                                })
                            }
                        }
                    });
                    conn.release();
                });
            }
            else
            {
                connection.acquire(function(err, conn){
                    productUnitDetails = JSON.parse(req.body.productUnitDetails);
                    productUnitDetails.companyid = req.decoded.logedinuser.companyid;
                    productUnitDetails.createdby = req.decoded.logedinuser.id;
                    conn.query('INSERT INTO `product_units` SET ?',productUnitDetails, function(err, result){
                        if(err)
                        {
                            console.log(err);
                            res.send({
                                status:0,
                                type:'error',
                                title:'Oops!',
                                message:'Somthing went wrong.'
                            })
                        }
                        else{

                            var unitid = result.insertId;
                            if(req.files != undefined && req.files.length > 0)
                            {
                                var ss = '';

                                req.files.map(function(val, index){
                                    ss = ss+'("'+val.filename+'",'+unitid+','+req.decoded.logedinuser.id+','+req.decoded.logedinuser.companyid+'),';
                                });
                                ss = ss.substring(0,ss.length - 1);

                                conn.query('INSERT INTO `product_images`(`filename`, `unitid`, `createdby`, `companyid`) VALUES '+ss, function(err, result){
                                    if(err)
                                    {
                                        res.send({
                                            status:0,
                                            type:'error',
                                            title:'Oops!',
                                            message:'Something went wrong, \n Failed to save product images.'
                                        })
                                    }
                                    else
                                    {
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done',
                                            message:'Product unit details saved successfully.'
                                        })
                                    }
                                });
                            }
                            else
                                    {
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done',
                                            message:'Product unit details saved successfully.'
                                        })
                                    }
                        }
                    });
                    conn.release();
                });
            }
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

    // OFFERS
    getOffersList:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`,`name`,`description`,`offer_prcnt`,(CASE WHEN status = 0 THEN "Deactive" ELSE "Active" END) as _status, DATE_FORMAT(createddate,"%d %M, %Y") AS _createddate FROM `offers` WHERE `companyid` = ?',[req.decoded.logedinuser.companyid], function(err, result){
                if(err)
                {
                    console.log(err)
                    res.send({
                        status:0,
                        type:'error',
                        title:'Oops!',
                        message:'Somthing went wrong.'
                    })
                }
                else
                {
                    res.send(result);
                }
            });
            conn.release();
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

    getOfferDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT * FROM `offers` WHERE `id` = ?',[req.params.id], function(err, result){
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
                    result[0].catagoryids = JSON.parse(result[0].catagoryids);
                    result[0].productids = JSON.parse(result[0].productids);
                    res.send(result);
                }
            });
            conn.release();
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

    saveOfferDetails: function(req, res)
    {
        if (req.decoded.success == true) {
            offerDetails = JSON.parse(req.body.offerDetails);
            if(offerDetails.id != undefined && offerDetails.id > 0)
            {

                if(req.files != undefined && req.files.length > 0)
                {
                    offerDetails.offer_image = req.file[0].filename;
                }

                connection.acquire(function(err, conn){

                    conn.query('UPDATE `offers` SET ? WHERE `id` = ?',[offerDetails, offerDetails.id], function(err, result){
                        if(err)
                        {
                            console.log(err)
                            res.send({
                                status:0,
                                type:'error',
                                title:'Oops!',
                                message:'Somthing went wrong.'
                            })
                        }
                        else{
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done',
                                    message:'Offer details updated successfully.'
                                })
                            }
                        }
                    });
                    conn.release();
                });
            }
            else
            {
                connection.acquire(function(err, conn){
                    offerDetails = JSON.parse(req.body.offerDetails);
                    offerDetails.companyid = req.decoded.logedinuser.companyid;
                    offerDetails.createdby = req.decoded.logedinuser.id;

                    if(req.files != undefined && req.files.length > 0)
                    {
                        offerDetails.offer_image = req.file[0].filename;
                    }

                    conn.query('INSERT INTO `offers` SET ?',offerDetails, function(err, result){
                        if(err)
                        {
                            console.log(err);
                            res.send({
                                status:0,
                                type:'error',
                                title:'Oops!',
                                message:'Somthing went wrong.'
                            })
                        }
                        else{
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done',
                                            message:'Offer details saved successfully.'
                                        })
                                    }
                    });
                    conn.release();
                });
            }
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

    // PURCHASE ORDER
    getPurchaseList:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT id, (SELECT vendors.name FROM vendors WHERE vendors.id = purchase_master.vendorid) as vendor_name, DATE_FORMAT(`po_date`, "%D %M, %Y") AS _po_date, DATE_FORMAT(`createddate`, "%D %M, %Y") AS _createddate, (CASE WHEN status = 2 THEN "Cancled" WHEN status = 1 THEN "Forwarded" ELSE "Pending" END) as _status FROM `purchase_master` WHERE `companyid` = ?',[req.decoded.logedinuser.companyid], function(err, result){
                if(err)
                {
                    console.log(err)
                    res.send({
                        status:0,
                        type:'error',
                        title:'Oops!',
                        message:'Somthing went wrong.'
                    })
                }
                else
                {
                    res.send(result);
                }
            });
            conn.release();
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

    getPurchaseDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT * FROM `purchase_master` WHERE `id` = ?',[req.params.id], function(err, result){
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

                    conn.query('SELECT * FROM `purchase_details` WHERE `po_id` = ?',[req.params.id], function(err, purchaseDetails){
                        if(err)
                        {
                            res.send(result);
                        }
                        else
                        {
                            result[0].PurchaseItems = purchaseDetails;
                            res.send(result);
                        }
                    });
                }
            });
            conn.release();
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

    getProductUnitsOnProduct:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`, CONCAT(`qty`,"",`unit`) AS product_unit, `unit` FROM `product_units` WHERE `productid` = ?',[req.params.id], function(err, result){
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
                    res.send(result);
                }
            });
            conn.release();
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

    deletePurchaseItem:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('DELETE FROM `purchase_details` WHERE `id` = ?',[req.params.id], function(err, result){
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
                    res.send({
                        status:1,
                        type:'success',
                        title:'Done!',
                        message:'Item deleted successfully'
                    })
                }
            });
            conn.release();
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

    savePurchaseDetails: function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){

                if(req.body.id != undefined && req.body.id > 0)
                {
                    conn.query('UPDATE `purchase_master` SET `vendorid`=?,`po_date`= ?, `status`=? WHERE `id` = ?',[req.body.vendorid, moment(new Date(req.body.po_date)).format("YYYY-MM-DD"), req.body.status, req.body.id], function(err, result){
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

                            if(req.body.PurchaseItems != undefined && req.body.PurchaseItems.length > 0)
                            {
                                var sql = '', purchaseitems = [];
                                req.body.PurchaseItems.map(function(val, index){
                                    if(val.id != undefined && val.id > 0)
                                    {
                                        delete val.productUnitsList;
                                        sql = sql+'UPDATE `purchase_details` SET ? WHERE id = ?;';
                                        purchaseitems.push(val);
                                        purchaseitems.push(val.id);
                                    }
                                    else
                                    {
                                        val.po_id = req.body.id;
                                        delete val.productUnitsList;
                                        sql = sql+'INSERT INTO `purchase_details` SET ?;';
                                        purchaseitems.push(val);
                                    }
                                });

                                conn.query(sql,purchaseitems, function(err, result){
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
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done!',
                                            message:'Purchase details updated successfully'
                                        })
                                    }
                                });

                            }
                            else
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done!',
                                    message:'Purchase details updated successfully'
                                })
                            }
                        }
                    });
                }
                else
                {
                    conn.query('INSERT INTO `purchase_master`(`vendorid`, `po_date`,`status`,`createdby`, `companyid`) VALUES (?,?,?,?,?)',[req.body.vendorid, moment(new Date(req.body.po_date)).format("YYYY-MM-DD"),req.body.status, req.decoded.logedinuser.id, req.decoded.logedinuser.companyid], function(err, result){
                        if(err)
                        {
                            console.log(err,'---------------1');
                            res.send({
                                status:0,
                                type:'error',
                                title:'Oops!',
                                message:'Somthing went wrong.'
                            })
                        }
                        else
                        {

                            if(req.body.PurchaseItems != undefined && req.body.PurchaseItems.length > 0)
                            {
                                var sql = '', purchaseitems = [];
                                req.body.PurchaseItems.map(function(val, index){
                                        val.po_id = result.insertId;
                                        delete val.productUnitsList;
                                        sql = sql+'INSERT INTO `purchase_details` SET ?;';
                                        purchaseitems.push(val);
                                    
                                });

                                conn.query(sql,purchaseitems, function(err, result){
                                    if(err)
                                    {
                                        console.log(err,'---------------2');
                                        res.send({
                                            status:0,
                                            type:'error',
                                            title:'Oops!',
                                            message:'Somthing went wrong.'
                                        })
                                    }
                                    else
                                    {
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done!',
                                            message:'Purchase details saved successfully'
                                        })
                                    }
                                });

                            }
                            else
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done!',
                                    message:'Purchase details saved successfully'
                                })
                            }
                        }
                    });
                }
                conn.release();
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

    // GOODS RECIEPTS
    getGoodsRecieptsList:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT `id`,`po_id`,(SELECT vendors.name FROM vendors WHERE vendors.id = (SELECT purchase_master.vendorid FROM purchase_master WHERE purchase_master.id = gr_master.po_id LIMIT 1)) as vendor_name,(SELECT DATE_FORMAT(purchase_master.po_date,"%D %M, %Y") FROM purchase_master WHERE purchase_master.id = gr_master.po_id) as _po_date ,DATE_FORMAT(`gr_date`,"%d %m, %y") AS `_gr_date`,`gross_amount`,(`cgst`+`sgst`+`igst`) AS _gst,`net_amount` FROM `gr_master` WHERE `companyid` = ?',[req.decoded.logedinuser.companyid], function(err, result){
                if(err)
                {
                    console.log(err)
                    res.send({
                        status:0,
                        type:'error',
                        title:'Oops!',
                        message:'Somthing went wrong.'
                    })
                }
                else
                {
                    res.send(result);
                }
            });
            conn.release();
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

    verifyGoodsEntryExist:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT count(*) as existingGrs FROM `gr_master` WHERE `po_id` = ?',[req.params.id], function(err, result){
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
                    res.send(result);
                }
                });
                conn.release();
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

    getGoodsRecieptDetails:function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){
            conn.query('SELECT * FROM `gr_master` WHERE `id` = ?',[req.params.id], function(err, result){
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

                    conn.query('SELECT * FROM `gr_details` WHERE `gr_id` = ?',[req.params.id], function(err, purchaseDetails){
                        if(err)
                        {
                            res.send(result);
                        }
                        else
                        {
                            result[0].PurchaseItems = purchaseDetails;
                            res.send(result);
                        }
                    });
                }
            });
            conn.release();
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


    saveGoodsRecieptsDetails: function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){

               /*  if(req.body.id != undefined && req.body.id > 0)
                {
                    conn.query('UPDATE `gr_master` SET `gr_date`=?,`gross_amount`=?,`cgst`=?,`sgst`=?,`igst`=?,`net_amount`=? WHERE `id`= ?',[moment(new Date(req.body.gr_date)).format("YYYY-MM-DD"), req.body.gross_amount,req.body.cgst,req.body.sgst,req.body.igst,req.body.net_amount, req.body.id], function(err, result){
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

                            if(req.body.PurchaseItems != undefined && req.body.PurchaseItems.length > 0)
                            {
                                var sql = '', purchaseitems = [];
                                req.body.PurchaseItems.map(function(val, index){
                                    if(val.id != undefined && val.id > 0)
                                    {
                                        delete val.productUnitsList;
                                        sql = sql+'UPDATE `gr_details` SET ? WHERE id = ?;';
                                        purchaseitems.push(val);
                                        purchaseitems.push(val.id);
                                    }
                                    else
                                    {
                                        val.gr_id = req.body.id;
                                        delete val.productUnitsList;
                                        sql = sql+'INSERT INTO `gr_details` SET ?;';
                                        purchaseitems.push(val);
                                    }
                                });

                                conn.query(sql,purchaseitems, function(err, result){
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
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done!',
                                            message:'Purchase details updated successfully'
                                        })
                                    }
                                });

                            }
                            else
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done!',
                                    message:'Purchase details updated successfully'
                                })
                            }
                        }
                    });
                }
                else */
                {
                    conn.query('INSERT INTO `gr_master`(`po_id`, `gr_date`, `gross_amount`, `cgst`, `sgst`, `igst`, `net_amount`, `createdby`, `companyid`) VALUES (?,?,?,?,?,?,?,?,?)',[req.body.id, moment(new Date(req.body.gr_date)).format("YYYY-MM-DD"),req.body.gross_amount,req.body.cgst,req.body.sgst,req.body.igst,req.body.net_amount, req.decoded.logedinuser.id, req.decoded.logedinuser.companyid], function(err, result){
                        if(err)
                        {
                            console.log(err,'---------------1');
                            res.send({
                                status:0,
                                type:'error',
                                title:'Oops!',
                                message:'Somthing went wrong.'
                            })
                        }
                        else
                        {

                            if(req.body.PurchaseItems != undefined && req.body.PurchaseItems.length > 0)
                            {
                                var sql = '', purchaseitems = [];
                                req.body.PurchaseItems.map(function(val, index){
                                        val.gr_id = result.insertId;
                                        delete val.productUnitsList;
                                        delete val.po_id;
                                        delete val.id;
                                        delete val.qty;
                                        sql = sql+'INSERT INTO `gr_details` SET ?;';
                                        purchaseitems.push(val);
                                    
                                });

                                conn.query(sql,purchaseitems, function(err, result){
                                    if(err)
                                    {
                                        console.log(err,'---------------2');
                                        res.send({
                                            status:0,
                                            type:'error',
                                            title:'Oops!',
                                            message:'Somthing went wrong.'
                                        })
                                    }
                                    else
                                    {
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done!',
                                            message:'Goods Reciept details saved successfully'
                                        })
                                    }
                                });

                            }
                            else
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done!',
                                    message:'Purchase details saved successfully'
                                })
                            }
                        }
                    });
                }
                conn.release();
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


    updateGoodsRecieptsDetails: function(req, res)
    {
        if (req.decoded.success == true) {
            connection.acquire(function(err, conn){

                 if(req.body.id != undefined && req.body.id > 0)
                {
                    conn.query('UPDATE `gr_master` SET `gr_date`=?,`gross_amount`=?,`cgst`=?,`sgst`=?,`igst`=?,`net_amount`=? WHERE `id`= ?',[moment(new Date(req.body.gr_date)).format("YYYY-MM-DD"), req.body.gross_amount,req.body.cgst,req.body.sgst,req.body.igst,req.body.net_amount, req.body.id], function(err, result){
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

                            if(req.body.PurchaseItems != undefined && req.body.PurchaseItems.length > 0)
                            {
                                var sql = '', purchaseitems = [];
                                req.body.PurchaseItems.map(function(val, index){
                                    if(val.id != undefined && val.id > 0)
                                    {
                                        delete val.productUnitsList;
                                        sql = sql+'UPDATE `gr_details` SET ? WHERE id = ?;';
                                        purchaseitems.push(val);
                                        purchaseitems.push(val.id);
                                    }
                                    else
                                    {
                                        val.gr_id = req.body.id;
                                        delete val.productUnitsList;
                                        sql = sql+'INSERT INTO `gr_details` SET ?;';
                                        purchaseitems.push(val);
                                    }
                                });

                                conn.query(sql,purchaseitems, function(err, result){
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
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done!',
                                            message:'Purchase details updated successfully'
                                        })
                                    }
                                });

                            }
                            else
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done!',
                                    message:'Purchase details updated successfully'
                                })
                            }
                        }
                    });
                }
                else 
                {
                    conn.query('INSERT INTO `gr_master`(`po_id`, `gr_date`, `gross_amount`, `cgst`, `sgst`, `igst`, `net_amount`, `createdby`, `companyid`) VALUES (?,?,?,?,?,?,?,?,?)',[req.body.id, moment(new Date(req.body.gr_date)).format("YYYY-MM-DD"),req.body.gross_amount,req.body.cgst,req.body.sgst,req.body.igst,req.body.net_amount, req.decoded.logedinuser.id, req.decoded.logedinuser.companyid], function(err, result){
                        if(err)
                        {
                            console.log(err,'---------------1');
                            res.send({
                                status:0,
                                type:'error',
                                title:'Oops!',
                                message:'Somthing went wrong.'
                            })
                        }
                        else
                        {

                            if(req.body.PurchaseItems != undefined && req.body.PurchaseItems.length > 0)
                            {
                                var sql = '', purchaseitems = [];
                                req.body.PurchaseItems.map(function(val, index){
                                        val.gr_id = result.insertId;
                                        delete val.productUnitsList;
                                        delete val.po_id;
                                        delete val.id;
                                        delete val.qty;
                                        sql = sql+'INSERT INTO `gr_details` SET ?;';
                                        purchaseitems.push(val);
                                    
                                });

                                conn.query(sql,purchaseitems, function(err, result){
                                    if(err)
                                    {
                                        console.log(err,'---------------2');
                                        res.send({
                                            status:0,
                                            type:'error',
                                            title:'Oops!',
                                            message:'Somthing went wrong.'
                                        })
                                    }
                                    else
                                    {
                                        res.send({
                                            status:1,
                                            type:'success',
                                            title:'Done!',
                                            message:'Goods Reciept details saved successfully'
                                        })
                                    }
                                });

                            }
                            else
                            {
                                res.send({
                                    status:1,
                                    type:'success',
                                    title:'Done!',
                                    message:'Purchase details saved successfully'
                                })
                            }
                        }
                    });
                }
                conn.release();
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