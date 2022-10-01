const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AXzpAfkWen-YcNttim_sU7KcutQJwz8W0EUpIclWn5dHbEyWBRqgV-row8olsxVvitz52bq_HHSJrvPH',
  'client_secret': 'ED-oCMbYb_5Tz1xEsZMHHXIP7aq4cGb_e6ZbNX3vDeOL6PS8slQhIahglqVYWfxR3pNy7z3lyp1R_4TJ'
});

const app = express();

var amt = null;

app.get('/pay/:amt', (req, res) => {
   
    amt = req.params.amt;

    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://192.168.0.105:9000/success",
          "cancel_url": "http://192.168.0.105:9000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Hat",
                  "sku": "001",
                  "price": amt,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": amt
          },
          "description": "Hat for the best team ever"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });

  app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    console.log("payerId",payerId,"paymentId",paymentId) 
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": amt
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log("error",error.response);
          throw error;
      } else {
          res.sendFile(__dirname + "/success.html")
      }
  });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

const PORT = process.env.PORT || 9000 ;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));