import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Page1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>

          </IonButtons>
          <IonTitle>Page 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Page 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton routerLink="/app/page1/details" expand="full">
          Details
        </IonButton>
        <IonButton routerLink="/detailsoutside" expand="full">
          Details Outside
        </IonButton>
       
      </IonContent>
    </IonPage>
  );
};

export default Page1;
