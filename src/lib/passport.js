//SE REALIZA EL PROCESO DE SIGNIN Y SIGNUP

//const { validationResult } = require('express-validator/check');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//REGISTRO
passport.use('local.signup', new LocalStrategy({//creo la autentificacion
    /* 1er parametro:nombre de la estrategia que se utilizará para identificarla
    2do: tipo de estrategia que desea crear*/
    //LocalStrategy espera encontrar las credenciales de usuario en los parámetros usernameField y passwordFiel  
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //para obtener datos adicionales
}, async (req, username, password, done) => {
    const { namee, lname, phone, email, img } = req.body; 
    let newUser = { //es un objeto
        username,
        password,
        namee,
        lname,
        phone,
        email,
        img 
    };
    console.log(req.body);
    //consulta a la base de datos
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', newUser);
    //me va a devolver el callback done para que continue
    //va a almacenar el newUser en una sesión
    newUser.id = result.insertId;
    return done(null, newUser);
}));//despues de la , defino que es lo que va a hacer despues de autentificarse el usuario
//done p que continue luego del proceso de autentificacion

//Lo guarda en una sesión
passport.serializeUser((user, done) => {
    done(null, user.id); //null es para error
});

//todo el id guardado para volver a obtener los datos
passport.deserializeUser (async(id, done ) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]); //
});

//INICIO DE SESIÓN
passport.use('local.signin', new LocalStrategy({ 
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //para obtener datos adicionales
}, async (req, username, password, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) { //si esto se cumple significa que se encontró algun usuario
        const user = rows[0]; //guardo el usuario que se encontró
        const validPassword = await helpers.matchPassword(password, user.password);//compara contraseñas
        //la ingresada en texto plano con la cifrada
        if (validPassword) { //si validPass es true 
            done(null, user, req.flash('success', 'Bienvenido ' + user.username)); //termino el proceso del signin
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
            //false pq no se obtuvo ningun usuario
        }
    } else { //directamente no encontro el usuario
        return done(null, false, req.flash('message', 'No existe el usuario'))
    }
}));





