const path = require("path");
const express = require("express"); 
const multer = require('multer');
const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null, './uploads');
    }, // where to save the file
    filename: function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    } // how to save the file
})
const upload = multer({storage: storage }) //  put the uploaded files in the uploads folder


app.set('view engine', "ejs");
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended:false})); //whenever we're using form data

app.get("/", (req, res) => {
    return res.render("view")
}); 

app.post('/upload', upload.single('profileImage'),  (req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
})
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});