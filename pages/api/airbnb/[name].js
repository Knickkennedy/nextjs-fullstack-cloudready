import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const { name } = req.query
    const database = (await clientPromise).db('sample_airbnb')
    const listings = database.collection('listingsAndReviews')

    const options = {
      projection: { _id: 0, name: 1, summary: 1 }
    }

    const listing = await listings.findOne({ name }, options)

    res.status(200).json(listing)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data'})
  }
}