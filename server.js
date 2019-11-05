require('isomorphic-fetch');
require('dotenv').config();
const mongoose = require('mongoose');
const Koa = require('koa');
const session = require('koa-session');
const shopifyAuth = require('@shopify/koa-shopify-auth');
const Shop = require('./models/shop');

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const port = process.env.PORT || 3000;
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;
const app = new Koa();

app.keys = [SHOPIFY_API_SECRET_KEY];

app
	.use(session(app))
	.use(
		shopifyAuth.default({
			apiKey: SHOPIFY_API_KEY,
			secret: SHOPIFY_API_SECRET_KEY,
			scopes: ['read_products', 'write_products'],
			async afterAuth(ctx) {
				const { shop, accessToken } = ctx.session;
				try {
					const store = new Shop({shop, accessToken});
					await store.save();
					console.log('Ran save');
					ctx.redirect('/')
				} catch(e) {console.log('Error saving shop', e);}
			}
		})
	)
	.use(shopifyAuth.verifyRequest())
	.use(async ctx => {
	  ctx.body = 'Hello World';
	});

app.listen(port, () => console.log(`Running on PORT: ${port}`));
















