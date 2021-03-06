import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable){
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    );
  }
  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false
  }
}

// 'customer.subscription.create',
const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export default async function webhooksFunc(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'POST') {

    const buf = await buffer(req);
    const secret = req.headers['stripe-signature']
    
    // Seta o tipo da variavel
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`)
    }

    // Tipo do evento no webhook
    const type = event.type;

    if(relevantEvents.has(type)){

      try {
        switch (type) {
          // case 'customer.subscription.create':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':

            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false,
              )
              // type === 'customer.subscription.create',

            break;
          case 'checkout.session.completed':

            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );

            break;
          default:
            throw new Error('Unhandled event.');
        }
      } catch (err) {
        return res.json({error: 'Webhook handler failed.'});
      }

      // console.log('Evento recebido', event)
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}


// yarn stripe listen --forward-to localhost:3005/api/webhooks