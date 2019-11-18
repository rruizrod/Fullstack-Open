const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("Connected to DB");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB:", error);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);