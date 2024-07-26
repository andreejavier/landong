import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './About.css';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle text-center>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>
       
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className='about-title'>Welcome to Project Landong</IonCardTitle>
            <IonCardSubtitle></IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>This is a freelance project on which aims to create an interactive documentation
            of tree planting activities in the Philippines
          </IonCardContent>
        </IonCard>

         <IonGrid>
        <IonRow>
          <IonCol  size="6">
          <IonCard>
          <IonCardHeader>
            <IonCardTitle className='about-title'>Welcome to Project Landong</IonCardTitle>
            <IonCardSubtitle></IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>This is a freelance project on which aims to create an interactive documentation
            of tree planting activities in the Philippines
          </IonCardContent>
          </IonCard>
          </IonCol>
          <IonCol>
            
          </IonCol>
        </IonRow>
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;
