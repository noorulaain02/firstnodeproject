var Db = require('./dboperations');
var StTest = require('./studentTest');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/apitest',router);


router.use((request,response,next)=> {
    console.log('middleware');
    next();
})

router.route('./studentTest').get((request,response) => {
    Db.GetStudent().then((data) => {
        response.json(data[0]);
    })
})

router.route('./studentTest/:STDID').get((request,response) => {
    Db.SelectStudent(request.params.STDID).then((data) => {
        response.json(data[0])
    })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order Api is running at ' + port);
