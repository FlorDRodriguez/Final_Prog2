//RUTA P ALMACENAR LAS CATEGORIAS

const express = require ('express');
const router = express.Router();
const pool = require('../database'); //pool hace referencia a la conexion a la db

const { isLoggedIn } = require('../lib/auth');//de ese archivo importo ese metodo

//AGREGAR UNA CATEGORIA
router.get('/add_c', isLoggedIn, (req, res) => {
    res.render('categories/add_c');
});

router.post('/add_c', isLoggedIn, async (req , res) =>{
    const { nameCat } = req.body;//del objeto quiero esa prop
    const newCategory = { //guardo los datos dentro de un nuevo objeto
        nameCat,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO categories set ?', [newCategory]);//guardo los datos en la db
    req.flash('success', 'Lista creada exitosamente');
    //es una petición asincrona por lo que se usa await para que cuando termine siga con la sig linea
    //para que await funcione, a la función hay que agregarle async
    res.redirect('/categories/list_c');
});

//LISTAR LAS CATEGORIAS
router.get('/list_c',isLoggedIn, async (req, res) => { //seria /products pero todos los product preceden con /product
    const categories = await pool.query('SELECT * FROM categories');
    res.render('categories/list_c', { categories });//le pasa los links a esta vista
});


//ELIMINAR UN PRODUCTO
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;//id que está pasando el usuario
    await pool.query('DELETE FROM products WHERE category_id =?', [id]);
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);//el ? es el paramentro que se le pasa a continuacion
    req.flash('success', 'Lista eliminada exitosamente');
    res.redirect('/categories/list_c');
});


//EDITAR UNA CATEGORIA
router.get('/edit/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;//id que está pasando el usuario
    const categories = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);//el ? es el paramentro que se le pasa a continuacion
    res.render('categories/edit_c', {category: categories[0]}); //te pasa la propiedad links con los valores que traje de la db
});


//ACTUALIZA LOS DATOS QUE SE MODIFICAN
router.post('/edit_c/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { nameCat } = req.body; 
    const newCategory = {
        nameCat,
    };
    await pool.query('UPDATE categories set ? WHERE id = ?', [newCategory, id]);
    req.flash('success', 'Lista actualizada exitosamente');
    res.redirect('/categories/list_c');
});

module.exports = router;