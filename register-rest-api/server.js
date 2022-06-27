const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { body, check, validationResult } = require('express-validator');
const db = require('./dbConnection');
const port = 2023;

const app = express();
app.use(cors());

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Node js registration rest apis');
});

app.post('/register',
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email', 'Email is required')
        .isEmail(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('gender').not().isEmpty().withMessage('Select your gender'),
    check('fav_lan').not().isEmpty().withMessage('Choose ur favourite language'),
    check('address').not().isEmpty().withMessage('Address is required'),
    check(
        "password",
        "Please enter a password at least 8 character ",
    )
        .isLength({ min: 8 }),
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        db.query(
            `INSERT INTO users (username, email, gender, fav_lan, address, password) VALUES ('${req.body.username}',  ${db.escape(
                req.body.email
            )}, '${req.body.gender}', '${req.body.fav_lan}', '${req.body.address}', '${req.body.password}' )`,
            (err, result) => {
                if (err) {
                    throw err;
                    return res.status(400).send({
                        msg: err
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Registration successful',
                })

            }
        );

        /*res.status(200).json({
            success: true,
            message: 'Login successful',
        })*/
    });

app.listen(port);
console.log('See where it all happens at http://localhost:' + port);
