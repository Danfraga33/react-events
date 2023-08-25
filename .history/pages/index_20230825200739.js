import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '@/components/meetups/MeetupList';

function HomePage({ meetups }) {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={meetups} />;
		</Fragment>
	);
}

export async function getStaticProps() {
	// fetch data from an API
	const client = await MongoClient.connect(
		'mongodb+srv://danfraga33:nextjsapp@cluster0.7nxkotj.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	// Collection
	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();
	console.log(meetups);

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				id: meetup._id.toString(),
				title: meetup.title,
				// image: meetup.image,
				// address: meetup.address,
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
