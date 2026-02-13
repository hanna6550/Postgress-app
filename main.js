const {Client} = require('pg')
const express = require('express')

const app = express()
app.use(express.json())


const con = new Client({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"root",
    database:"demopost"

})

con.connect().then(() => console.log("connected"))

app.post('/postData', (req,res) => {

    const {name, id} = req.body
    const insert_query = "INSERT INTO demotable (name, id) VALUES ($1, $2)"

    con.query(insert_query, [name, id], (err, result) =>{
        if(err)
            {
                res.send(err)
            }else{
                console.log(result)
                res.send("POSTED DATA")
            }
    })
})

app.get('/fetchData', (req, res) =>{

    const fetch_query = "SELECT * from demotable"

    con.query(fetch_query, (err, result) =>{
        try{
            res.send(result.rows)

        }catch (err){
            console.error(err.message)
        }
    })
})

app.get("/fetchbyId/:id", (req,res) =>{
    const id = req.params.id
    const fetch_query = "SELECT * from demotable where id = $1 "

    con.query(fetch_query, [id],(err, result) => {
        try{

            res.send(result.rows)

        }catch (err){
            console.error(err.message)
        }
    })
})

app.put('/update/:id', (req,res) => {
    const id = req.params.id;
    const name = req.body.name;

    const update_query = "UPDATE demotable SET name=$1 Where id = $2"

    con.query(update_query, [name, id], (err,result) => {
        try{

            res.send("Updated")
        }catch (error){
            console.error(err.message)
        }
    })
})

app.delete("/delete/:id", (req,res) => {
    const id = req.params.id
    const delete_query = "DELETE from demotable where id=$1"

    con.query(delete_query, [id], (err,result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3000,()=>{
    console.log("server is runing")
})