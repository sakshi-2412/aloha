// Notifications (success, error) for app

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';

export default function notif(ititle,imessage,itype){
    Store.addNotification({
        title: ititle,
        message: imessage,
        type: itype,
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeInRight"],
        animationOut: ["animate__animated", "animate__fadeOutRight"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    });
}