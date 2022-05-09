require('dotenv').config()
const Joi = require('joi')
const express = require('express')
const app = express()
const books = [
    {id:1, name:'rich poor dad'},
    {id:2, name:'22222222'},
    {id:3, name:'33333333333'},
    {id:4, name:'444444444444'},
]
app.use(express.json())
const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    try{
        res.send('salom')
    }catch(e){
        console.log(e);
    }
})
app.get('/api/books',(req,res)=>{
    res.send(books)
})

app.post('/api/books',(req,res)=>{
    const {error} = validateBook(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    const book = {
        id: books.length + 1,
        name: req.body.name
    }
    books.push(book)
    res.status(201).send(book)
})

app.get('/api/books/:id',(req,res)=>{
    const book = books.find(b=>b.id === parseInt(req.params.id))
    if(!book){
        return res.status(404).send('bu id bilan kitob topilamdi')
    }
    res.send(book)
})

app.put('/api/books/:id',(req,res)=>{
    const book = books.find(b=>b.id === parseInt(req.params.id))
    if(!book){
        return res.status(404).send('bu id bilan kitob topilamdi')
    }
    
    const {error} = validateBook(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    book = req.body.name
    res.send(book)
})

app.delete('/api/books/:id',(req,res)=>{
    const book = books.find(b=>b.id === parseInt(req.params.id))
    if(!book){
        return res.status(404).send('bu kitob topilmadi')
    }
    const bookIndex = books.indexOf(book)
    books.splice(bookIndex,1)
    res.send(book)
})

function validateBook(book){
    const bookSchema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(book,bookSchema)
    
}

app.get('/api/articles/:year/:month',(req,res)=>{
    res.send(req.query)
})

app.listen(PORT, ()=>{
    console.log(`${PORT} port ishladi...`);
})