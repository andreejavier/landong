import React from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, newspaperOutline, logOutOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Details from './Details';
import './Home.css';


const Menu: React.FC = () => {
  const sidemenuItems = [
    {
      name:'Home',
      url:'/app/home',
      icon:homeOutline
    },
    {
      name:'Page 1',
      url:'/app/page1',
      icon:homeOutline
    },
    {
      name:'Page 2',
      url:'/app/page2',
      icon:newspaperOutline
    }
  ]

  return (
    <IonPage>
    <IonSplitPane contentId="main">
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          {/* Sidemenu Items*/}
          {sidemenuItems.map((item, index) => (
            <IonMenuToggle key={index}>
              <IonItem routerLink={item.url} routerDirection="forward">
                {item.name}
              </IonItem>
            </IonMenuToggle>
          ))}

          <IonButton routerLink="/" routerDirection="back" expand="full"> 
            Logout  
          </IonButton>
        </IonContent>
      </IonMenu>


      {/* Routers */}
      <IonRouterOutlet id="main">
        
        <Route exact path="/app/home" component={Home} />
        <Route exact path="/app/page1" component={Page1} />
        <Route exact path="/app/page1/details" component={Details} />
        <Route exact path="/app/page2" component={Page2} />
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>

      </IonRouterOutlet>
    </IonSplitPane>
  </IonPage>
  );
};

export default Menu;
