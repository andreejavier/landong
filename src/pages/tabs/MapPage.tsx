import React, { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useLocation } from 'react-router-dom'; // Use this to access passed state
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage: React.FC = () => {
  const location = useLocation<any>(); // Access passed location state
  const { lat, lon } = location.state || {}; // Extract lat and lon from state

  useEffect(() => {
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  }, [lat, lon]);

  return (
    <IonContent>
      {lat && lon ? (
        <MapContainer
          center={[parseFloat(lat), parseFloat(lon)]}
          zoom={13}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[parseFloat(lat), parseFloat(lon)]}>
            <Popup>
              A new location! Latitude: {lat}, Longitude: {lon}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>No coordinates provided.</p>
      )}
    </IonContent>
  );
};

export default MapPage;
