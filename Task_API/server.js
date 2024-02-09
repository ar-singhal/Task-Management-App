const http = require('http');
const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());

const dbConfig ={
    user:'sa',
    password:'admin@123',
    server:'localhost',
    database:'task_mgmtDB',
    options:{
        trustServerCertificate: true
    }
}
// Connect to the MSSQL database
mssql.connect(dbConfig)
  .then(() => console.log('Connected to MSSQL database'))
  .catch(err => console.error('Error connecting to MSSQL database:', err));

  app.use(cors());

// get all tasks api route
//  Fetch all tasks.

app.get('/tasks',async function(req,res){
    try {
        //const pool = await mssql.connect(dbConfig);
        const result= await mssql.query('SELECT * FROM taskTbl');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

// get task by id api route
// Fetch a single task by ID.

app.get('/tasks/:id',async function(req,res){
    
    try {
        const taskId = req.params.id;
        const pool = await mssql.connect(dbConfig);
        const result= await pool.request().
        input('taskId',mssql.Int,taskId)
        .query('SELECT * FROM taskTbl WHERE taskId=@taskId');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});



// post task api route
//  Add a new task.
app.post('/tasks',async function(req,res){
    try {
        const { title, descript, due_date, status }=req.body;
        const pool = await mssql.connect(dbConfig);
        await pool.request(). 
        input('title', mssql.VarChar(50), title)
        .input('descript', mssql.VarChar(255), descript)
        .input('due_date', mssql.Date, due_date)
        .input('status', mssql.VarChar(15), status)
        .query('INSERT INTO taskTbl (title, descript, due_date, status) VALUES (@title, @descript, @due_date, @status)');
        res.status(201).json({ message: 'Task created successfully' });

        //res.status(201).send('Task created successfully');
        
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update task api route
// Update a task by ID.
app.put('/tasks/:id',async function(req,res){
    const taskId=req.params.id;
    const {title,descript,due_date,status}=req.body;
    try {
        const pool = await mssql.connect(dbConfig);
        let updateQuery = 'UPDATE taskTbl SET ';
        const inputs = {
          taskId: mssql.Int,
          title: mssql.VarChar(50),
          descript: mssql.VarChar(255),
          due_date: mssql.Date,
          status: mssql.VarChar(15)
        };
        if (title !== undefined) {
          updateQuery += 'title = @title, ';
        }
        if (descript !== undefined) {
          updateQuery += 'descript = @descript, ';
        }
        if (due_date !== undefined) {
          updateQuery += 'due_date = @due_date, ';
        }
        if (status !== undefined) {
          updateQuery += 'status = @status, ';
        }
        // Remove the trailing comma and space
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += ' WHERE taskId = @taskId';
        const request = pool.request();
        request.input('taskId', mssql.Int, taskId);
        if (title !== undefined) {
          request.input('title', mssql.VarChar(50), title);
        }
        if (descript !== undefined) {
          request.input('descript', mssql.VarChar(255), descript);
        }
        if (due_date !== undefined) {
          request.input('due_date', mssql.Date, due_date);
        }
        if (status !== undefined) {
          request.input('status', mssql.VarChar(15), status);
        }
        await request.query(updateQuery);
        res.status(201).json({ message: 'Task updated successfully' });

      } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// delete task api route
//  Delete a task by ID.
app.delete('/tasks/:id',async function(req,res){
    const taskId=req.params.id;
    try {
        const pool =await mssql.connect(dbConfig);
        await pool.request().
        input('taskId',mssql.Int,taskId)
        .query('DELETE FROM taskTbl WHERE taskId=@taskId');
        // res.status(200).send("Deleted task successfully");
        res.status(201).json({ message: 'Deleted task successfully' });
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// default URL to API
app.use('/', function(req, res) {
    res.send('task-api works :-)');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);