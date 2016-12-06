var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/demo', function(req, res) {
  res.render('demo', {
    title: 'Use jQuery',
    descript: 'This instance is from another'
  })
})

router.get('/v1', function(req, res) {
    res.render('demoV1', {
        title: 'Use jQuery',
        descript: '這是第一次實作的例子，並未對cell8、cell9做正確排列。'
    })
})

router.get('/v2', function(req, res) {
    res.render('demoV2', {
        title: 'Use jQuery',
        descript: '第二次實作，對cell9處理並不完美，每迭代一次data1都將會繁瑣搜尋data3。'
    })
})

router.get('/v3', function(req, res) {
  res.render('demoV3', {
    title: 'Javascript',
    descript: '使用Javascript並改善v2頻繁遍歷問題'
  })
})


module.exports = router;
