const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const { MongoClient, ObjectId } = require('mongodb');


const app = express();

//Para usar parametros que vienen por Post
app.use(bodyParser.urlencoded({ extended: true, encode: true }));
app.use(bodyParser.json());

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: null }));
app.set('view engine', 'hbs');
let recepcionDB = null;

//Middleware
app.use((req, res, next) =>{// next: la siguiente funcion en el pipeine de ejecucion
    res.locals.currentPage = req.url; //configura un valor en el objecto response, para acceder a la ruta actual
next();
})


//Routes
app.get('/index', renderIndex);
app.get('/receptor/:receptor_id', renderReceptor);
app.post('/add-receptor', addReceptor);




function renderIndex(req, res) {
    recepcionDB.collection('receptores').find({}, { projection: { nombreComercial: 1 } }, (err, cursor) => {//objecto receptores permite realizar consultas
        if (err) return handleError(res, err)

        cursor.toArray((err, data) => {
            console.log(data);
            res.render('index', { receptores: data });
        });
    });
}

function renderReceptor(req, res) {
    const receptorId = req.params.receptor_id;

    recepcionDB.collection('receptores').findOne({ _id: new ObjectId(receptorId) }, (err, receptor) => {//objecto receptores permite realizar consultas
        if (err) return handleError(res, err)
        console.log(receptor);
        //res.status(200).send(receptor); 
        res.render('receptor', { receptor: receptor });
    });
}

function addReceptor(req, res) {

    const { codigo,nombre,correo } = req.body;//Parametros que vienen por Post
    const newReceptor = {
        codigo,
        "nombreComercial" : nombre,
        correo}

    //const insert = {newReceptor}    

    recepcionDB.collection('receptores').insert(newReceptor, (err, result) =>{
        if (err) return handleError(res, err)
        console.log(result);
        res.redirect(200, '/index')
    });

}

function handleError(res, err) {
    console.log('Error: ', err);
    res.status(500).send(err);

}

app.get('/receptores', (req, res) => {//consultar todos los receptores

    const receptores = recepcionDB.collection('receptores'); //objecto receptores permite realizar consultas
    receptores.find({}, (err, cursor) => {
        if (err) {
            console.log(err);
            res.status(500).send({ err: err.message });
            return;
        }
        // To array - Obtener los datos en forma de arreglo en js
        cursor.toArray((parseError, result) => {
            if (parseError) {
                console.log(parseError);
                res.status(500).send({ err: parseError.message });
                return;
            }
            res.status(200).send(result);
        });
    });
    res.status(200)
    // .render('books',)

})

app.listen(9090, () => {

    console.log('server is runnnin on port 9090');
    const mongoDbPath = 'mongodb+srv://jfsandoval:Recepcion2021*@recepcion.vcmd0.mongodb.net/Recepcion?retryWrites=true&w=majority';
    const mongoConf = { useNewUrlParser: true, useUnifiedTopology: true };
    MongoClient.connect(mongoDbPath, mongoConf, (err, client) => {
        if (err) {

            console.log('Error connecting to Database ', err);
            return;
        }

        console.log('Conection State ', client.isConnected());
        recepcionDB = client.db('Recepcion');
    });
});