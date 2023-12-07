import { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from './config';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Cafe Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active dev meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.reverse().map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
