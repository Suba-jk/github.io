const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    subject: String,
    feedback: String
});
export default mongoose.model('Contact', contactSchema);
