const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  address: String
});