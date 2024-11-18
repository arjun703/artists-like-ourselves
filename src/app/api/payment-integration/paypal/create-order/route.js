import paypal from '@paypal/checkout-server-sdk';

import { getLoggedInUsername } from '@/app/api/utils';

const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);



export  async function POST(req) {

    const { amount, artistId } = await req.json(); // Get artistId from request body

    console.log("amount", amount)

    const request = new paypal.orders.OrdersCreateRequest();
    
    request.prefer("return=representation");

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: amount,
            },
            custom_id: artistId, // Store artist ID as custom metadata in the order
        }],
    });

    try {
        
        const {token_exists, username} = getLoggedInUsername()

        if(!token_exists) throw new Error("Login to support")

        const order = await client.execute(request);

        return new Response(JSON.stringify({ id: order.result.id ,success: true }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (err) {

        return new Response(JSON.stringify({ success: false, msg: err.message  }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 500
        });
    
    }

} 