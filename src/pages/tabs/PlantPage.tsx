import React, { useState } from 'react';
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
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const RadioPage: React.FC = () => {
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>(
    'https://www.freeiconspng.com/uploads/no-image-icon-6.png'
  );
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory(); // Create history instance for navigation

  const clearInputs = () => {
    setLat('');
    setLon('');
    setDateTime('');
    setLocationInfo(null);
    setImagePreview('https://www.freeiconspng.com/uploads/no-image-icon-6.png');
  };

  const handleImageInput = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);

        EXIF.getData(file, () => {
          const latData = EXIF.getTag(file, 'GPSLatitude');
          const lonData = EXIF.getTag(file, 'GPSLongitude');
          const latRef = EXIF.getTag(file, 'GPSLatitudeRef') || 'N';
          const lonRef = EXIF.getTag(file, 'GPSLongitudeRef') || 'E';
          const date = EXIF.getTag(file, 'DateTimeOriginal');

          if (latData && lonData) {
            const toDecimal = (degree: number[], ref: string) => {
              const decimal =
                degree[0] + degree[1] / 60 + degree[2] / 3600;
              return ref === 'S' || ref === 'W' ? -decimal : decimal;
            };

            const latitude = toDecimal(latData, latRef);
            const longitude = toDecimal(lonData, lonRef);

            setLat(latitude.toString());
            setLon(longitude.toString());

            fetchLocationData(latitude, longitude);
          } else {
            setLat('No GPS data');
            setLon('No GPS data');
          }

          if (date) {
            setDateTime(date);
          } else {
            setDateTime('No date data');
          }
        });
      };
      reader.readAsDataURL(file);
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

  // Capture photo
  const capturePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
    });

    if (photo.dataUrl) {
      setImagePreview(photo.dataUrl);
    }
  };

  const submitForm = () => {
    // Simulate form submission and navigate to MapPage with coordinates
    setShowToast(true);
    
    // After the toast, navigate to MapPage and pass latitude and longitude
    history.push({
      pathname: '/map', // Assuming the map page route is '/map'
      state: { lat, lon }, // Pass lat and lon to the map page
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
                <input
                  type="file"
                  onChange={handleImageInput}
                  className="form-control"
                />
                <div className="mt-3">
                  <IonInput value={lat} readonly placeholder="Latitude" />
                  <IonInput value={lon} readonly placeholder="Longitude" />
                  <IonInput
                    value={dateTime}
                    readonly
                    placeholder="Datetime"
                  />
                </div>

                {locationInfo && typeof locationInfo !== 'string' && (
                  <div className="mt-3">
                    <IonInput
                      value={locationInfo.displayName}
                      readonly
                      placeholder="Location"
                    />
                  </div>
                )}
                {typeof locationInfo === 'string' && (
                  <p>{locationInfo}</p>
                )}

                <IonButton
                  onClick={() => setModalOpen(true)}
                  className="mt-3"
                >
                  Save Data
                </IonButton>
                <IonButton
                  onClick={clearInputs}
                  className="mt-3"
                  color="secondary"
                >
                  Clear
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <div className="modal-header">
            <h1>Upload Details?</h1>
            <IonButton
              onClick={() => setModalOpen(false)}
              color="light"
            >
              Close
            </IonButton>
          </div>
          <div className="modal-body">
            Are you sure you want to save the data?
          </div>
          <div className="modal-footer">
            <IonButton
              onClick={() => setModalOpen(false)}
              color="light"
            >
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
