
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const routes = express.Router();
const dbConn = require('../config');
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken');

routes.get('/', verifyTokenAndAuthorization, (req, res) => {
    const q = "SELECT * FROM merchants";
    dbConn.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

routes.post('/', verifyToken, (req, res) => {
    const q = "INSERT INTO merchants (`id`,`username`,`brand_name`,`logo`,`mobile`,`website`,`address`,`footnote`,`signature`) VALUES(?)";
    const values = [
        uuidv4(),
        req.body.name,
        req.body.brandName,
        req.body.logo,
        req.body.mobile,
        req.body.website,
        req.body.address,
        req.body.footnote,
        req.body.signature,
    ]

    dbConn.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        res.json("Merchant configuration added succesfully")
    })
})

routes.delete('/:id', verifyTokenAndAuthorization, (req, res) => {
    const merchantId = req.params.id;
    const q = `DELETE FROM merchants WHERE id =?`;
    dbConn.query(q, [merchantId], (err, data) => {
        if (err) return res.json(err);
        res.json("Deleted Successfully");

    })
})

routes.put('/:id', verifyTokenAndAuthorization, (req, res) => {
    const merchantId = req.params.id;

    const values = [
        req.body.brandName,
        req.body.logo,
        req.body.mobile,
        req.body.website,
        req.body.address,
        req.body.footnote,
        req.body.signature,
    ];

    const q = `UPDATE merchants SET brand_name= ?,logo= ?,mobile= ?,website= ?,address= ?,footnote= ?,signature =? WHERE id =?`;

    dbConn.query(q, [...values, merchantId], (err, data) => {
        if (err) return res.json(err);
        res.json("Merchant Info Updated Successfully")
    })

})

module.exports = routes