const dotenv = require('dotenv');
const Koa = require('koa');
const mongoose = require('koa-mongoose');

const port = process.env.PORT || 3000;
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;
const app = new Koa();

app.use(mongoose({
	uri: 'mongodb+srv://KevinM:330.mongo@cluster0-vdm6j.mongodb.net/test?retryWrites=true&w=majority',
	mongodbOptions: {
		poolSize: 5,
		native_parser: true
	},
	events: {
		connected() {console.log('connected');}
	}
}));



app.listen(port, () => console.log(`Running on PORT: ${port}`));