import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
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
  distance: { 
    type: Number,
    required: true
  },
  duration: { 
    type: Number,
    required: true
  },
  path: {
    type: [[Number]],
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

RouteSchema.index({ startPoint: '2dsphere' });
RouteSchema.index({ endPoint: '2dsphere' });
RouteSchema.index({ waypoints: '2dsphere' });

RouteSchema.index({ name: 'text', tags: 'text' });

const Route = mongoose.model('Route', RouteSchema);

export default Route;