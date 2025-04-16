
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: String,
  eventTime: String,
  eventLocation: String,
  eventDescription: String
});

export default mongoose.model('Event', eventSchema);

