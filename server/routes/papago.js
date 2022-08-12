const { Router } = require("express");
const router = Router();




router.get('/:tag', function (req, res) {
    //res.json({result:'성공'})
    const {tag} = req.params; 
    var client_id = 'HHuKgPvK_WOfTLO2aSBB';
    var client_secret = 'qxFVxwyfmZ';
    //console.log(req.query.hashtag); 
    var query =tag; //번역해야할 단어(영어)
   
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   var request = require('request');
   var options = {
       url: api_url,
       form: {'source':'en', 'target':'ko', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.post(options, function (error, response, body) {
    console.log(body); 
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 module.exports = router;