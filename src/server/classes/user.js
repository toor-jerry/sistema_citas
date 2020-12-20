// Encrypt library
const bcrypt = require('bcryptjs');

// Socket
const { io } = require('../app');

// User model
const UserModel = require('../models/user');

class User {

    // search all users
    static findAll() {
        return new Promise((resolve, reject) => {

            UserModel.find({})
                .lean()
                .populate('area')
                .sort('name')
                .exec((err, users) => {

                    if (err) reject({ msg: `Could not found users.`, err, code: 500 });
                    resolve({ data: users });

                });
        });
    }

    // create user
    static create(data) {
        return new Promise((resolve, reject) => {
            if (!data) return reject({ msg: 'No data', code: 400 });

            // unique email
            UserModel.findOne({ email: data.email })
                .exec((err, userDB) => {

                    if (err) return reject({ msg: 'Error db', err, code: 500 });
                    if (userDB) return reject({ msg: 'Email wold be unique', code: 400 });

                    // data definiticion
                    let body = {
                        name: data.name,
                        last_name: data.last_name,
                        email: data.email,
                        password: bcrypt.hashSync(data.password, 10), // encrypt password
                        role: data.role,
                        area: data.area
                    };

                    // new model of user
                    let user = new UserModel(body);

                    // data persist
                    user.save((err, userCreated) => {

                        if (err) return reject({ msg: 'Error db', err, code: 500 });
                        if (!userCreated) return reject({ msg: 'Could not create the user.', code: 400 });

                        io.emit('new-user-registered-admin', { data: userCreated });
                        resolve(userCreated);
                    });

                });

        });
    }


    static login(email, password) {
        return new Promise((resolve, reject) => {
            if (!email) return reject({ msg: 'No data (email).', code: 400 });
            if (!password) return reject({ msg: 'No data (password).', code: 400 });

            UserModel.findOne({ email: email })
                .populate('area')
                .exec((err, userDB) => {

                    if (err) return reject({ msg: 'Error db', err, code: 500 });
                    if (!userDB) return reject({ msg: 'User not found.', code: 400 });

                    if (!bcrypt.compareSync(password, userDB.password))
                        return reject({ msg: 'Usuario y/ó contraseña incorrectos.', code: 400 });

                    userDB.password = ':)';

                    resolve(userDB);
                });
        });
    }

    // delete user
    static delete(user) {
        return new Promise((resolve, reject) => {

            UserModel.findByIdAndRemove(user, (err, userDB) => {

                if (err) return reject({ msg: 'Error db', err, code: 500 });
                if (!userDB) return reject({ msg: 'Could not delete the user.', code: 500 });

                io.emit('delete-user-registered-admin', { data: userDB });
                resolve(userDB);
            });
        });
    }

}

module.exports = { User }