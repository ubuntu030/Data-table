var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/v1', function(req, res) {
    res.render('demoV1', {
        title: 'Use jQuery',
        descript: 'This is my first example'
    })
})

router.get('/v2', function(req, res) {
    res.render('demoV2', {
        title: 'Use jQuery',
        descript: 'Optimizing Javascript code'
    })
})

module.exports = router;
