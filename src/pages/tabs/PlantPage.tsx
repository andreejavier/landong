import React, { useState } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import EXIF from 'exif-js';

const RadioPage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [datetime, setDatetime] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        EXIF.getData(file, function () {
          const lat = EXIF.getTag(this, 'GPSLatitude');
          const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
          const lon = EXIF.getTag(this, 'GPSLongitude');
          const lonRef = EXIF.getTag(this, 'GPSLongitudeRef');
          const date = EXIF.getTag(this, 'DateTimeOriginal');

          if (lat && lon) {
            const latitude = convertDMSToDD(lat, latRef);
            const longitude = convertDMSToDD(lon, lonRef);
            setLatitude(latitude);
            setLongitude(longitude);
          }
          if (date) {
            setDatetime(date);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const convertDMSToDD = (dms, ref) => {
    const [degrees, minutes, seconds] = dms;
    let dd = degrees + minutes / 60 + seconds / 3600;

    // Apply the reference to adjust the sign
    if (ref === 'S' || ref === 'W') {
      dd = -dd;
    }

     return dd;
  };

  const handleClear = () => {
    setImageSrc(null);
    setLatitude('');
    setLongitude('');
    setDatetime('');
  };

  return (
    <>
      <IonContent>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <div>
            {imageSrc ? (
              <img src={imageSrc} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '150px', height: '150px', backgroundColor: '#ccc' }} />
            )}
          </div>
          <div>
            <h2>Upload Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <IonItem>
              <IonLabel position="stacked">Latitude</IonLabel>
              <IonInput value={latitude} readonly />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Longitude</IonLabel>
              <IonInput value={longitude} readonly />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Datetime</IonLabel>
              <IonInput value={datetime} readonly />
            </IonItem>
            <div style={{ marginTop: '10px' }}>
              <IonButton color="primary">Save Data</IonButton>
              <IonButton color="medium" onClick={handleClear}>Clear</IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default RadioPage;
