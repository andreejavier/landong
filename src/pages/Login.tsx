import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  useIonRouter, IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAvatar,
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
  IonText
} from '@ionic/react';
import './Home.css';
import './Theme.css';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/landong/app','forward','replace');
  }

  return (
    <IonPage>
    <IonContent  className="ion-padding">
      <IonGrid fixed={true}>
        <IonRow className='login-col-padding ion-justify-content-center' >
          <IonCol push="4.3">
            <IonAvatar class='login-avatar'>
                <img alt="Silhouette of a person's head" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHqDPgJRc7CcvTMiZz9xxSticdKzy5Uxar6hItdwerUg&s" />
            </IonAvatar>
          </IonCol> 
        </IonRow>
        <IonRow class="ion-justify-content-center">
          <IonCol>
            <IonCard className="ion-padding">
            <div className='login-card-padding'></div>
              
                <IonCardTitle className='login-card-title' >User Login</IonCardTitle>
                <br />
                <IonInput  label="Username:" value="hexedhorizon"labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>
                <br />
                <IonInput label="Password:" type="password" value="" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>

                <IonRow >
                  <IonCol >
                  <IonButton onClick={() => doLogin()} expand="block" color="landong-secondary" shape="round">  <IonText  className="login-log-btn-txt" >
                  Login
                </IonText></IonButton>
                  </IonCol>
            
                </IonRow>
                <IonRow >
                  <IonCol >
                  <IonButton onClick={() => doLogin()} expand="block" color="secondary" shape="round">
                    <p className="login-log-btn-txt">Signup</p></IonButton>
                  </IonCol>
            
                </IonRow>
            
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
  );
};

export default Login;
