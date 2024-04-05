import express from "express";

const app = express();

// app.get('/', (req, res)=>{
//     res.send('Server is ready!')
// })

//get a list of 5 different jokes
app.get('/api/jokes', (req, res)=>{ ///api/jokes because standardisation
    const jokes = [
        {id: 1,  Joke:  "Why couldn't the bicycle stand up by itself? Because it was two-tired!"},
        {id: 2,  Joke:  "What do you call a fish wearing a crown? A kingfish!"},
        {id: 3,  Joke:  "Why don't skeletons fight each other? They don't have the guts!"},
        {id: 4,  Joke:  "What do you call a bear with no teeth? A gummy bear!"},
        {id: 5,  Joke:  "What do you call a pile of cats? A meowtain!"}
    ]
    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`)
})