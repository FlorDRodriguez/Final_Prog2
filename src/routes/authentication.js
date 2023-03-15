//SE CREAN LAS RUTAS DEL SIGNIN, SIGNUP, PROFILE, LOGOUT

const express = require('express');
const router = express.Router();
const passport = require('passport'); 

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');//de ese archivo importo ese metodo

//REGISTRO

//ruta p renderizar el form
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

//ruta p recibir los datos del form
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
//toma el nombre de la autenticacion creada(local.signup)
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

//INICIO DE SESIÓN

//ruta p renderizar el form
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
}));

//PERFIL
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});


//CERRAR SESIÓN
router.get('/logout', (req, res) => {
    req.logOut();//es un método de passport
    res.redirect('/signin');
})

module.exports = router;