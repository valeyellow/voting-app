const mongoose = require("mongoose");

(async () => {
  try {
    const connectionStatus = await mongoose.connect(
      "mongodb+srv://test:test@voting-app.6jao7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    console.log("MongoDB connection successful!");
  } catch (error) {
    console.log("Connection failed...", error);
  }
})();
