import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonButton,
  IonInput,
  IonImg,
  IonCard,
  IonCardContent,
  IonModal,
  IonToast,
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import EXIF from 'exif-js';
import { useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RadioPage: React.FC = () => {
  const [lat, setLat] = useState<string | null>(null);
  const [lon, setLon] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState<string>('No date available');
  const [imagePreview, setImagePreview] = useState<string>(
    'https://www.freeiconspng.com/uploads/no-image-icon-6.png'
  );
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const history = useHistory();

  const clearInputs = () => {
    setLat(null);
    setLon(null);
    setDateTime('No date available');
    setLocationInfo(null);
    setImagePreview('https://www.freeiconspng.com/uploads/no-image-icon-6.png');
    setPosition(null);
  };

  const handleImageInput = (event: any) => {
    const file = event.target.files[0];

    if (file && (file.type === 'image/jpg' || file.type === 'image/tiff')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);

        EXIF.getData(file, function () {
          const latData = EXIF.getTag(this, 'GPSLatitude');
          const lonData = EXIF.getTag(this, 'GPSLongitude');
          const latRef = EXIF.getTag(this, 'GPSLatitudeRef') || 'N';
          const lonRef = EXIF.getTag(this, 'GPSLongitudeRef') || 'E';
          const date = EXIF.getTag(this, 'DateTimeOriginal');

          if (latData && lonData) {
            const toDecimal = (degree: number[], ref: string) => {
              const decimal = degree[0] + degree[1] / 60 + degree[2] / 3600;
              return ref === 'S' || ref === 'W' ? -decimal : decimal;
            };

            const latitude = toDecimal(latData, latRef);
            const longitude = toDecimal(lonData, lonRef);

            setLat(latitude.toString());
            setLon(longitude.toString());
            setPosition([latitude, longitude]);

            fetchLocationData(latitude, longitude);
          } else {
            setLat('No GPS data available');
            setLon('No GPS data available');
          }

          if (date) {
            setDateTime(date);
          }
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Unsupported file type. Only jpg and TIFF images are supported.');
    }
  };

  const fetchLocationData = (lat: number, lon: number) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          const locationData = {
            displayName: data.display_name,
            address: data.address,
          };
          setLocationInfo(locationData);
        } else {
          setLocationInfo('Error fetching location data');
        }
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
        setLocationInfo('Error fetching location data');
      });
  };

  const capturePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
    });

    if (photo.dataUrl) {
      setImagePreview(photo.dataUrl);

      const blob = await fetch(photo.dataUrl).then((res) => res.blob());

      EXIF.getData(blob, function () {
        const latData = EXIF.getTag(this, 'GPSLatitude');
        const lonData = EXIF.getTag(this, 'GPSLongitude');
        const latRef = EXIF.getTag(this, 'GPSLatitudeRef') || 'N';
        const lonRef = EXIF.getTag(this, 'GPSLongitudeRef') || 'E';
        const date = EXIF.getTag(this, 'DateTimeOriginal');

        if (latData && lonData) {
          const toDecimal = (degree: number[], ref: string) => {
            const decimal = degree[0] + degree[1] / 60 + degree[2] / 3600;
            return ref === 'S' || ref === 'W' ? -decimal : decimal;
          };

          const latitude = toDecimal(latData, latRef);
          const longitude = toDecimal(lonData, lonRef);

          setLat(latitude.toString());
          setLon(longitude.toString());
          setPosition([latitude, longitude]);

          fetchLocationData(latitude, longitude);
        } else {
          setLat('No GPS data available');
          setLon('No GPS data available');
        }

        if (date) {
          setDateTime(date);
        } else {
          setDateTime('No date available');
        }
      });
    }
  };

  const submitForm = () => {
    setShowToast(true);
    history.push({
      pathname: '/map',
      state: { lat, lon },
    });
  };

  return (
    <>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <div className="row mb-4">
              <div className="col-md-12">
                <IonButton onClick={capturePhoto} expand="block" className="mb-3">
                  Capture Photo
                </IonButton>
              </div>
              <div className="col-md-4">
                <IonImg className="img-fluid" src={imagePreview} />
              </div>
              <div className="col-md-8">
                <h5>Upload Image</h5>
                <input type="file" onChange={handleImageInput} className="form-control" />
                <div className="mt-3">
                  <IonInput value={lat || ''} readonly placeholder="Latitude" />
                  <IonInput value={lon || ''} readonly placeholder="Longitude" />
                  <IonInput value={dateTime} readonly placeholder="Datetime" />
                </div>

                {locationInfo && typeof locationInfo !== 'string' && (
                  <div className="mt-3">
                    <IonInput value={locationInfo.displayName} readonly placeholder="Location" />
                  </div>
                )}
                {typeof locationInfo === 'string' && <p>{locationInfo}</p>}

                <IonButton onClick={() => setModalOpen(true)} className="mt-3">
                  Save Data
                </IonButton>
                <IonButton onClick={clearInputs} className="mt-3" color="secondary">
                  Clear
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {position && (
          <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                A photo was taken here. <br />
                {locationInfo?.displayName}
              </Popup>
            </Marker>
          </MapContainer>
        )}

        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <div className="modal-header">
            <h1>Upload Details?</h1>
          </div>
          <div className="modal-body">Are you sure you want to save the data?</div>
          <div className="modal-footer">
            <IonButton onClick={() => setModalOpen(false)} color="light">
              Close
            </IonButton>
            <IonButton onClick={submitForm} color="primary">
              Save changes
            </IonButton>
          </div>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="New record added successfully!"
          duration={2000}
          color="success"
        />
      </IonContent>
    </>
  );
};

export default RadioPage;
