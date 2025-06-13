import Route from '../models/Route.js'; 

export const saveRoute = async (req, res) => {
  try {
    const { startPoint, endPoint, waypoints, distance, duration } = req.body;
    const userId = req.user._id;

    const route = new Route({
      user: userId,
      startPoint,
      endPoint,
      waypoints,
      distance,
      duration,
    });

    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSavedRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ user: req.user._id });
    res.json(routes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};