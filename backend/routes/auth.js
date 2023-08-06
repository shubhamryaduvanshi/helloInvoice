const routes = require("express").Router();
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dbConn = require("../config");
const { v4: uuidv4 } = require('uuid');


function executeQuery(query, values) {
    return new Promise((resolve, reject) => {
        dbConn.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// REGISTER Merchant ROUTE
routes.post("/register", async (req, res) => {

    const { username, password, brandName, logo, mobile, website, address, footnote, signature } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Please enter username and password" })
    }

    // Todo : Optimize the code with all handling

    const queryToCheckUserNameExistance = "SELECT COUNT(*) as count FROM merchants WHERE username = ?";

    executeQuery(queryToCheckUserNameExistance, [username])
        .then((results) => {
            if (results[0].count > 0) {
                res.status(409).json({
                    message: "Username already exists."
                });
            } else {
                const encryptedPassword = CryptoJS.AES.encrypt(
                    password,
                    process.env.AES_SECRET_KEY
                ).toString();

                const q = "INSERT INTO merchants (`id`,`username`,`brand_name`,`logo`,`mobile`,`website`,`address`,`footnote`,`signature`,`password`) VALUES(?)";
                const values = [
                    uuidv4(),
                    username,
                    brandName,
                    logo,
                    mobile,
                    website,
                    address,
                    footnote,
                    signature,
                    encryptedPassword
                ]

                dbConn.query(q, [values], (err, data) => {
                    if (err) return res.status(400).json(err);
                    res.json({ message: "Merchant configuration added succesfully" })
                })
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
});

// LOGIN USER ROUTE
routes.post("/login", async (req, res) => {

    const { username } = req.body;
    if (!username || !req.body.password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    const query = 'SELECT * FROM merchants WHERE username = ?';
    executeQuery(query, [username])
        .then((results) => {
            if (!results[0]) {
                res.status(400).json({ msg: "Merchant does not exist" });
                return;
            }
            const decryptedPassword = CryptoJS.AES.decrypt(
                results[0].password,
                process.env.AES_SECRET_KEY
            ).toString(CryptoJS.enc.Utf8);

            if (decryptedPassword !== req.body.password) {
                res.status(400).json({ msg: "Incorrect username or password" });
                return;
            }

            const accessToken = jwt.sign(
                {
                    id: results[0].id,
                    userName: results[0].username
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" }
            );

            const responseObj = {
                merchant: {
                    userName: results[0].username,
                    brandName: results[0].brand_name,
                    logo: results[0].logo,
                    mobile: results[0].mobile,
                    website: results[0].website,
                    address: results[0].address,
                    footnote: results[0].footnote,
                    signature: results[0].signature,
                },
                accessToken
            }
            res.status(200).json(responseObj)
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

module.exports = routes;
