import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '@/components/meetups/MeetupDetail';

function MeetupDetails(props) {
	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	);
}

export async function getStaticPaths() {
	//Mongo Connect
	const client = await MongoClient.connect(
		'mongodb+srv://danfraga33:nextjsapp@cluster0.7nxkotj.mongodb.net/meetups?retryWrites=true&w=majority'
	);

	//Collection Connect
	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection
		.find({}, { projection: { _id: 1 } })
		.toArray();
	// console.log(meetups);

	client.close();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	// fetch data for a single meetup

	const meetupId = context.params.meetupId;
	// console.log(meetupId);

	const client = await MongoClient.connect(
		'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: new ObjectId(meetupId),
	});
	// console.log(selectedMeetup);

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup.data._id.toString(),
				title: selectedMeetup.data.title,
				address: selectedMeetup.data.address,
				image: selectedMeetup.data.image,
				description: selectedMeetup.data.description,
			},
		},
	};
}

export default MeetupDetails;
