import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;

		//Mongo Connect
		const client = await MongoClient.connect(
			'mongodb+srv://danfraga33:nextjsapp@cluster0.7nxkotj.mongodb.net/meetups?retryWrites=true&w=majority'
		);

		//Connecting to Colletion
		const db = client.db();
		const meetupsCollection = db.collection('meetups');

		// Data
		const result = await meetupsCollection.insertOne(data);
		console.log(data);

		console.log(result);

		client.close();

		res.status(201).json({ message: 'Meetup inserted!' });
	}
}

export default handler;
