const CartModel = require('../../models/cartModel');

require('dotenv').config();
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const checkout = async (req, res) => {
    try {
        console.log(req.body);
        const lineItems = req.body.cart.map((item) => (
            {
                "price_data": {
                    "currency": "inr",
                    "unit_amount": item.product.price * 100,
                    "product_data": {
                        "name": item.product.name,
                        "images": ['https://wearekingly.com/wp-content/uploads/2021/06/Custom-made-T-Shirts-35.jpg'],
                    }
                },
                "quantity": item.quantity,
            }
        ))
        // console.log('lineItems: ', lineItems);

        const customer = await stripe.customers.create({
            name: req.body.paymentDetails.first_name,
            email: req.body.cart[0].user.email,
            phone: req.body.paymentDetails.telephone,
            address: {
                line1: req.body.paymentDetails.address,
                country: req.body.paymentDetails.country.code,
                state: req.body.paymentDetails.state,
                postal_code: req.body.paymentDetails.postal_code,
                city: req.body.paymentDetails.city
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.WEBSITE_URL}/payment/success`,
            cancel_url: `${process.env.WEBSITE_URL}/payment/cancel`,
            customer: customer.id
        })
        console.log(session);

        res.status(200).json({ message: 'success', session });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { checkout }