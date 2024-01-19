const User = require('../model/User');
const router = require('express').Router();
const stripe = require('stripe')(/* process.env.STRIPE_SECRET */ 'sk_test_51OZlA1Ih84GqeSYqoPc4VrqcMaBpG3Am1VLa3EZnPYkNqvz0aMNUtNhI5wxNywGFHfxMdcj6PajBbZDWIpd30qSj00oo1MNE1k');


router.post('/:id', async (req, res) => {
    const { name, amount, price } = req.body;
    const userId = req.params.id;

    const foundUser = await User.findById(userId);



    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card', 'klarna', 'cashapp'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name, // Replace with your product name
                        },
                        unit_amount: price * 100, // Replace with the actual amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`, // Replace with your success URL
            cancel_url: 'http://localhost:3000/credits', // Replace with your cancel URL
        })

        foundUser.lastPaymentSession = { sessionId: session.id, amount: amount };
        let result = await foundUser.save();
        console.log(result);

        res.json({ id: session.id });

    } catch (error) {
        console.log(error);
    }




})

router.post('/success/:id', async (req, res) => {

    const userId = req.params.id;

    const sessionId = req.body.sessionId;

    const foundUser = await User.findById(userId).exec();

    if(foundUser.lastPaymentSession?.sessionId === sessionId) {
        
        foundUser.credits = foundUser.credits +  foundUser.lastPaymentSession.amount;
        foundUser.lastPaymentSession = {};
        await foundUser.save();
        const credits = foundUser.credits;
        console.log(`You have ${credits} credits `);
        res.json(credits)
    } else {
        res.sendStatus(500).json('Error');
    }


} )

module.exports = router;