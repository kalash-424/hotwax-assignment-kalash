const { db } = require('../db/db_connection');
const { v4: uuidv4 } = require('uuid');

const apicontrollers = {
  createPerson: async (req, res) => {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        gender,
        birth_date,
        marital_status_enum_id,
        employment_status_enum_id,
        occupation,
      } = req.body;

      // Implement logic to create a person in the database
      const result = await db.query(
        'INSERT INTO person (party_id, first_name, middle_name, last_name, gender, birth_date, marital_status_enum_id, employment_status_enum_id, occupation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.party_id, first_name, middle_name, last_name, gender, birth_date, marital_status_enum_id, employment_status_enum_id, occupation]
      );

      res.status(201).json({
        success: true,
        message: 'Person created successfully',
        party_id: req.body.party_id,
      });
    } catch (error) {
      console.error('Error creating person:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },

  createOrder: async (req, res) => {
    try {
      const {
        order_name,
        placed_date,
        approved_date,
        status_id,
        party_id,
        currency_uom_id,
        product_store_id,
        sales_channel_enum_id,
        grand_total,
        completed_date,
      } = req.body;

      // Generate a unique order_id using uuid
      const order_id = uuidv4().slice(0, 20);

      
      const result = await db.query(
        'INSERT INTO order_header (order_id, order_name, placed_date, approved_date, status_id, party_id, currency_uom_id, product_store_id, sales_channel_enum_id, grand_total, completed_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [order_id, order_name, placed_date, approved_date, status_id, party_id, currency_uom_id, product_store_id, sales_channel_enum_id, grand_total, completed_date]
      );

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order_id,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },

  addOrderItems: async (req, res) => {
    try {
      const { order_id, order_items } = req.body;

      
      for (const item of order_items) {
        await db.query(
          'INSERT INTO order_item (order_id, order_item_seq_id, product_id, item_description, quantity, unit_amount, item_type_enum_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [order_id, item.order_item_seq_id, item.product_id, item.item_description, item.quantity, item.unit_amount, item.item_type_enum_id]
        );
      }

      res.status(201).json({
        success: true,
        message: 'Order items added successfully',
        order_id,
        order_item_seq_ids: order_items.map((item) => item.order_item_seq_id),
      });
    } catch (error) {
      console.error('Error adding order items:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      // Implement logic to get all orders from the database
      const ordersResult = await db.query('SELECT * FROM order_header');
      console.log(ordersResult);

      // Process each order to get associated order items
      const orders = await Promise.all(

        ordersResult.map(async (order) => {
            const [orderItemsResult] = await db.query(
              'SELECT * FROM order_item WHERE order_id = ?',
              [order.order_id]
            );
      
            const orderItems = orderItemsResult.map((item) => {
              return {
                order_item_seq_id: item.order_item_seq_id,
                product_id: item.product_id,
                item_description: item.item_description,
                quantity: item.quantity,
                unit_amount: item.unit_amount,
                item_type_enum_id: item.item_type_enum_id,
              };
            });
            
      
          return {
            order_id: order.order_id,
            order_name: order.order_name,
            placed_date: order.placed_date,
            approved_date: order.approved_date,
            status_id: order.status_id,
            party_id: order.party_id,
            currency_uom_id: order.currency_uom_id,
            product_store_id: order.product_store_id,
            sales_channel_enum_id: order.sales_channel_enum_id,
            grand_total: order.grand_total,
            completed_date: order.completed_date,
            order_items: orderItems,
          };
        })
      );
      
      res.status(200).json({ orders });
    } catch (error) {
      console.error('Error getting all orders:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
,

  getAnOrder: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      // Implement logic to get a specific order from the database based on orderId
      const order = await db.query('SELECT * FROM order_header WHERE order_id = ?', [orderId]);

      res.status(200).json(order[0]);
    } catch (error) {
      console.error('Error getting an order:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { order_name } = req.body;

      // Implement logic to update the order in the database based on orderId
      await db.query('UPDATE order_header SET order_name = ? WHERE order_id = ?', [order_name, orderId]);

      res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        order_id: orderId,
        order_name,
      });
    } catch (error) {
      console.error('Error updating an order:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = apicontrollers;
