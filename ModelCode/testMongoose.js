const mongoose = require('mongoose');
const uri = 'mongodb+srv://Nick:ZnBzioOGU9oFAnwA@cluster0.z5edzea.mongodb.net/test';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(uri);
    

  const kittySchema = new mongoose.Schema({
    name: String
  });
  
  const Kitten = mongoose.model('Kitten', kittySchema);
}