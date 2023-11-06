const mongoose = require('mongoose');

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
		useUnifiedTopology: true,
    }
    try {
        await mongoose.connect("mongodb+srv://arundhathi:Arundhathi009@cluster0.mar6i.mongodb.net/login_system_Admin?retryWrites=true&w=majority", connectionParams);
        console.log("Connected to database successfully")
    } catch (error) {
        console.log("Could not connect to database!")
    }
}
