import { randomUUID } from 'crypto'

import type { Actions } from '@sveltejs/kit'
import { error, redirect } from '@sveltejs/kit'
import Stripe from 'stripe'

import { STRIPE_CHECKOUT_KEY } from '$env/static/private'

const stripe = new Stripe(STRIPE_CHECKOUT_KEY, {
  apiVersion: '2023-10-16',
})

export const actions = {
  default: async (event) => {
    // const formData = Object.fromEntries(await event.request.formData()) as Record<string, string>
    const result = await stripe.checkout.sessions.create({
      metadata: {
        hello: 'hello',
      },
      client_reference_id: randomUUID(),
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      custom_text: {
        shipping_address: { message: 'Just in case we need to contact you' },
      },
      customer_email: 'mp@mercury.fan',
      automatic_tax: { enabled: true },
      mode: 'payment',
      success_url: 'https://localhost:5173/experiences',
      cancel_url: `https://localhost:5173${event.url.pathname}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            unit_amount: 4999,
            product_data: {
              name: 'Exp One',
              description: 'Play one-on-one',
              images: [
                'https://www1.villanova.edu/content/villanova/advancement/development/athletic/support/Pavilion/_jcr_content/pagecontent/image.img.jpg/1541099272529.jpg',
                'https://www1.villanova.edu/content/villanova/advancement/development/athletic/support/Pavilion/_jcr_content/pagecontent/image.img.jpg/1541099272529.jpg',
              ],
              tax_code: 'txcd_10000000',
            },
            tax_behavior: 'exclusive',
            currency: 'USD',
          },
        },
      ],
    })

    if (result.url) {
      throw redirect(303, result.url)
    } else {
      throw error(500, 'no url')
    }
  },
} satisfies Actions
