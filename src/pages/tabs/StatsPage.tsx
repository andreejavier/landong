import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './StatsPage.css';
const LibraryPage = () => (
  <>
   
    <IonContent>

      <IonCard color="landong-secondary" text-white>
        <IonCardHeader>
          <div  className='stats-trees-planted-container'>
            <h3 className='stats-trees-planted-header'>Trees Planted</h3>
            <h1 className='stats-trees-planted'>1</h1>
          </div>
        </IonCardHeader>
      </IonCard>
    
    <div className="stats-box2">
      <IonCard className="stats-box2-sub">
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
          </IonCard>    
          <IonCard className="stats-box2-sub">
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
        </IonCard>
    </div>
  
    </IonContent>
  </>
);

export default LibraryPage;