const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

const LinkSchema = new mongoose.Schema({
    title: {type:String, required: true},
    description: {type: String},
    url: {type:String, required: true},
    clicks: {type:Number, default: 0},
});

const Link = mongoose.model('Link', LinkSchema);

// let link = new Link({
//     title: 'Youtube',
//     description: 'Esse link vai para o Youtube',
//     url: 'https://www.youtube.com/channel/UCZgELbe4_J5g6cV6z01e_ww',
//     click:0,
// });

// link.save().then(doc => {
//     console.log(doc);
// }).catch(error => {
//     console.log(error);
// });

mongoose.connect('mongodb://localhost/newLinks', {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

let db = mongoose.connection;

db.on('error', () => {console.log('Houve um erro')})
db.once('open', () => {
    console.log('Banco Carregado');

    app.get('/:title', async (req, res)=>{
        let title = req.params.title;
        try{
            let doc = await Link.findOne({title})
            res.redirect(doc.url);
        }catch (error){
            res.send(error);
        }
    })
});


app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, ()=> console.log(`Servidor Rodando na porta ${PORT}`))