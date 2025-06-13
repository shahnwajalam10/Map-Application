import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true
  }
});

const RouteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    trim: true,
    default: 'My Route'
  },
  startPoint: {
    type: PointSchema,
    required: true
  },
  endPoint: {
    type: PointSchema,
    required: true
  },
  waypoints: {
    type: [PointSchema],
    default: []
  },
  distance: { // in meters
    type: Number,
    required: true
  },
  duration: { // in seconds
    type: Number,
    required: true
  },
  path: {
    type: [[Number]], // Array of [lng, lat] pairs
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  }
});

// Create 2dsphere index for geospatial queries
RouteSchema.index({ startPoint: '2dsphere' });
RouteSchema.index({ endPoint: '2dsphere' });
RouteSchema.index({ waypoints: '2dsphere' });

// Add text index for search
RouteSchema.index({ name: 'text', tags: 'text' });

const Route = mongoose.model('Route', RouteSchema);

export default Route;