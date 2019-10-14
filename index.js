const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 2003

const db = mysql.createConnection({
    host: 'localhost',
    user: 'harry',
    password: 'password',
    database: 'moviepurwadhika',
    port: 3306,
  
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send('<h1>Welcome to my API</h1>')
})

app.get('/getmovies',(req,res)=>{
    var nama = req.query.nama?req.query.nama :''
    var sql =`SELECT * FROM movies  WHERE nama LIKE '%${nama}%'`

    db.query(sql,(err,results)=>{
        if(err){
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.get('/getmovies/:id',(req,res)=>{
    var sql = `SELECT * FROM movies WHERE id = ${req.params.id}`

    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).send(err)
        } 
        res.status(200).send(results)
    })
})

app.post('/addmovie',(req,res)=>{
    var movies = req.body 

    if(movies){
        var sql = `INSERT INTO movies SET ?`
        db.query(sql,movies,(err,results)=>{
            if(err){
              return  res.status(500).send(err)
            }
            sql=`SELECT * FROM movies`
            db.query(sql,(err,results)=>{
                if(err) return res.static(500).send(err)
                res.status(200).send(results)
            })
           
        })
    } else {
        res.status(500).send('Tolong Kasih Body')
    }
})

app.put('/editmovie/:id',(req,res)=>{
    var data = req.body;
        var sql = `UPDATE movies SET ? WHERE id = ${req.params.id}`

    db.query(sql,data,(err,results)=>{
        if(err) {
            console.log(err)
            return res.status(500).send(err)
            
        }

        sql = `SELECT * from movies;`
        db.query(sql, (err,results1) => {
            if(err) return res.status(500).send(err)
            
            res.status(200).send(results1)
        })
       
    })
})


app.delete('/deletemovie/:id',(req,res)=>{
    var sql=`DELETE FROM movies where id =${req.params.id}`

    db.query(sql,(err,results)=>{
        if(err) {
            return res.status(500).send(err)
        }
        sql=`SELECT * FROM movies`
        db.query(sql,(err,results1)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(results1)
        })
        
    })
})

app.get('/getcategories',(req,res)=>{
    var nama = req.query.nama?req.query.nama :''
    var sql =`SELECT * FROM categories  WHERE nama LIKE '%${nama}%'`

    db.query(sql,(err,results)=>{
        if(err){
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.post('/addcategories',(req,res)=>{
    var categories = req.body 

    if(categories){
        var sql = `INSERT INTO categories SET ?`
        db.query(sql,categories,(err,results)=>{
            if(err){
              return  res.status(500).send(err)
            }
            sql=`SELECT * FROM categories`
            db.query(sql,(err,results)=>{
                if(err) return res.static(500).send(err)
                res.status(200).send(results)
            })
           
        })
    } else {
        res.status(500).send('Tolong Kasih Body')
    }
})

app.put('/editcategories/:id',(req,res)=>{
    var data = req.body;
        var sql = `UPDATE categories SET ? WHERE id = ${req.params.id}`

    db.query(sql,data,(err,results)=>{
        if(err) {
            console.log(err)
            return res.status(500).send(err)
            
        }

        sql = `SELECT * from categories;`
        db.query(sql, (err,results1) => {
            if(err) return res.status(500).send(err)
            
            res.status(200).send(results1)
        })
       
    })
})


app.delete('/deletecategories/:id',(req,res)=>{
    var sql=`DELETE FROM categories where id =${req.params.id}`

    db.query(sql,(err,results)=>{
        if(err) {
            return res.status(500).send(err)
        }
        sql=`SELECT * FROM categories`
        db.query(sql,(err,results1)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send(results1)
        })
        
    })
})

app.get('/getmovcat', (req,res) => {  
    var sql =`SELECT nama, namacategories from movcat 
    JOIN movies ON movcat.idmovie = movies.idmovies
    JOIN categories ON movcat.idcategory = categories.idcategories;`;
    db.query(sql, (err,results) => {
        if(err) {
           
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
  })
  
 
  app.post('/addmovcat', (req,res) => {
    var movcat = req.body;   
        if(movcat) {
          var sql = `INSERT INTO movcat SET ? `
         
          db.query(sql, movcat, (err, results) => {
              if(err) {
                  return res.status(500).send(err)
              }
  
              res.status(200).send(results)
          })
      }
      else {
          res.status(500).send('Tolong kasih Body')
      }
  })
  
  
  app.delete('/deletemovcat/:id', (req,res) => {
    var sql = `DELETE FROM movcat WHERE idmovcat = ${req.params.id}`     
    db.query(sql, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
  })

app.listen(port,()=> console.log(`API aktif di port ${port}`))
