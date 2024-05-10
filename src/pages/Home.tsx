import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { IonReactRouter } from '@ionic/react-router';
import { mapSharp, leaf, statsChartOutline,} from 'ionicons/icons';
import { Redirect, Route } from 'react-router';

import MapPage from './tabs/MapPage';
import PlantPage from './tabs/PlantPage';
import StatsPage from './tabs/StatsPage';

const Page1: React.FC = () => {
  return (
    <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot='start'>
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle></IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding">
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonTitle size="large">Home</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/app/home/map" render={() => <MapPage />} exact={true} />
          <Route path="/app/home/plant" render={() => <PlantPage />} exact={true} />
          <Route path="/app/home/stats" render={() => <StatsPage />} exact={true} />
          <Redirect exact from="/app/home" to="/app/home/stats" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" color="landong-light">
          <IonTabButton tab="map" href="/app/home/map">
            <IonIcon icon={mapSharp} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>

          <IonTabButton tab="plant" href="/app/home/plant">
            <IonIcon icon={leaf} />
            <IonLabel>Plant Now</IonLabel>
          </IonTabButton>

          <IonTabButton tab="stats" href="/app/home/stats">
            <IonIcon icon={statsChartOutline} />
            <IonLabel>Stats</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonContent>
</IonPage>

  );
};

export default Page1;
