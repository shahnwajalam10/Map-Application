import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapRoute = () => {
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCurrentLocation(loc);
        setPointA(loc);
        setLoading(false);
      },
      () => {
        const fallback = { lat: 51.505, lng: -0.09 };
        setCurrentLocation(fallback);
        setPointA(fallback);
        setLoading(false);
      }
    );
  }, []);

  const geocodeLocation = async (query) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          limit: 1,
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        alert(`Location not found: ${query}`);
        return null;
      }
    } catch (err) {
      alert('Error fetching location');
      return null;
    }
  };

  const handleSetRoute = async () => {
    const fromLoc = await geocodeLocation(fromInput);
    const toLoc = await geocodeLocation(toInput);

    if (fromLoc && toLoc) {
      setPointA(fromLoc);
      setPointB(toLoc);
      setRouteInfo(null);
    }
  };

  const handleReset = () => {
    setPointA(currentLocation);
    setPointB(null);
    setRouteInfo(null);
    setFromInput('');
    setToInput('');
  };

  if (loading || !currentLocation) {
    return <div className="loading"><div className="spinner" /></div>;
  }

  return (
    <div className="map-page">
      <header className="app-header">
        <h1>Map Route App</h1>
        <div>
          <span>{user?.name || user?.email}</span>
          {/* <button onClick={logout} className="btn btn-secondary">Logout</button> */}
        </div>
      </header>

      <div className="map-controls">
        <div className="inputs">
          <input
            type="text"
            placeholder="From location"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="To location"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            className="input"
          />
          <button onClick={handleSetRoute} className="btn">Set Route</button>
          <button onClick={handleReset} className="btn">Reset Points</button>
        </div>
        {routeInfo && (
          <div className="route-info">
            <span>Distance: {(routeInfo.distance / 1000).toFixed(2)} km</span>
            <span>Time: {Math.round(routeInfo.time / 60)} min</span>
          </div>
        )}
      </div>

      <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler {...{ pointA, pointB, setPointA, setPointB, setRouteInfo }} />
        {pointA && <Marker position={pointA}><Popup>Point A</Popup></Marker>}
        {pointB && <Marker position={pointB}><Popup>Point B</Popup></Marker>}
        {pointA && pointB && <RoutingMachine {...{ pointA, pointB, setRouteInfo }} />}
      </MapContainer>
    </div>
  );
};

const ClickHandler = ({ pointA, pointB, setPointA, setPointB, setRouteInfo }) => {
  useMapEvent('click', (e) => {
    if (!pointA) setPointA(e.latlng);
    else if (!pointB) setPointB(e.latlng);
    else {
      setPointA(e.latlng);
      setPointB(null);
      setRouteInfo(null);
    }
  });
  return null;
};

const RoutingMachine = ({ pointA, pointB, setRouteInfo }) => {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(pointA.lat, pointA.lng), L.latLng(pointB.lat, pointB.lng)],
      routeWhileDragging: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: { styles: [{ color: '#0066ff', weight: 5 }] }
    }).addTo(map);

    routingControl.on('routesfound', (e) => {
      const route = e.routes[0];
      setRouteInfo({ distance: route.summary.totalDistance, time: route.summary.totalTime });
    });

    return () => map.removeControl(routingControl);
  }, [map, pointA, pointB, setRouteInfo]);

  return null;
};

export default MapRoute;
