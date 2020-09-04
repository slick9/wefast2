var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/', function(req, response, next) {
    console.log(req.body)
    request.post('https://robotapitest.wefast.in/api/business/1.1/create-order',{

    // request.post('https://robotapitest.wefast.in/api/business/1.1/create-order', {

        json: {
            "matter": req.body.matter,
            "points": [
                {
                    "address": req.body.address1,
                    "contact_person" : req.body.person1
                },
                {
                    "address": req.body.address2,
                    "contact_person" : req.body.person2
                }
            ]
        },
        headers: {
            'Content-Type': 'application/json',
            'X-DV-Auth-Token': 'X-DV-Auth-Token: 4D48245515752FCE3245329547807B5EBC54215A',
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            response.render('error');
            return;
        }
    
        else if (res.body.is_successful == false) {
            // console.log(error)
            console.log(res.body);
            response.render('error');
            
            return;
        }
        console.log(res.body);
        response.render('orderCreated', { data: res });
        return;
    })
});

router.post('/cancel', function(req, response, next) {
    // console.log("yolo");
    console.log(req.body.order_id);

    request.post('https://robotapitest.wefast.in/api/business/1.1/cancel-order', {
        json: {
            "order_id": req.body.order_id,
        },
        headers: {
            'Content-Type': 'application/json',
            'X-DV-Auth-Token': 'asdfadsf',
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            response.render('error');
            return;
        }else if (res.body.is_successful == false) {
            response.render('error');
            return;
        }
        console.log(res.body);
        // response.render('orderCancelled', { data: res });
        return;
       
    })
});

// router.get('/status', function(req, res, next) {

// })

module.exports = router;
