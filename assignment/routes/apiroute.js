const express = require('express');
const router = express.Router();
const apicontrollers = require('../controllers/apicontroller')


router.post('/api/persons',apicontrollers.createPerson);

router.post('/api/orders',apicontrollers.createOrder);

router.post('/api/orders/items',apicontrollers.addOrderItems);

router.get('/api/orders',apicontrollers.getAllOrders);

router.get('/api/orders/:orderId',apicontrollers.getAnOrder);

router.put('/api/orders/:orderId',apicontrollers.updateOrder);



module.exports = router;