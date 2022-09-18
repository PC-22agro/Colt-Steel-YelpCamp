const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("errror", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Mongo database connected");
});

//easy way to pick a random element from an array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const randomCities = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const c = new Campground({
            author: '62f17a2ddb7d45a227752515',
            location: `${cities[randomCities].city}, ${cities[randomCities].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Beautiful photos of woods and sunsets',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomCities].longitude,
                    cities[randomCities].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/peecee22/image/upload/v1661530890/YelpCamp/zdr88tan9fyxu3fmq0mw.png',
                    filename: 'YelpCamp/zdr88tan9fyxu3fmq0mw',
                },
                {
                    url: 'https://res.cloudinary.com/peecee22/image/upload/v1661530889/YelpCamp/n7jxmultfhoyuovijs1d.png',
                    filename: 'YelpCamp/n7jxmultfhoyuovijs1d',
                }
            ]
        })
        await c.save();
    }
}

//to close our data base we use
seedDB().then(() => {
    mongoose.connection.close();
})