# Consideraciones

## General

* Para ver la aplicación ingresar al siguiente [link](http://pokemon-9f063.web.app/)
* Para la realización de esta tarea nos basamos en los siguientes tutoriales:
  * [tutorial 1](https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/)

  * [tutorial 2](https://itnext.io/pwa-from-scratch-guide-yet-another-one-bdfa438b50aa)

## Notificaciones Push

1. Al momento de desplegar la aplicación en el navegador, se emitirá el `token` de registro del cliente. Éste aparecerá impreso en la consola del navegador, y debe ser copiado para que envíe la notificación (se debe asegurar que la pestaña tenga permisos para recibir notificaciones).

2. Para probar las notificaciones, se puede utilizar una aplicación que permita enviar solicitudes `http` (se recomienda `Postman`). Aquí se debe crear una solicitud de tipo `POST` mediante la [página (click aquí)](https://fcm.googleapis.com/fcm/send) con los siguientes campos:

    ```JSON
    Body: {
        "notification": {
            "title": "Nuevos Pokemones",
            "body": "¡Busca ya a los nuevos pokemones legendarios!",
            "click_action": "https://pokemon-9f063.web.app",
            "icon": "https://pokemon-9f063.web.app/icons/pokeball_512.png"
        },

        "to": "${token_copiado}",
    }
    Header 1: {
        "KEY": "Content-Type",
        "VALUE": "application/json"
    },
    Header 2: {
        "KEY": "Authorization",
        "VALUE": "key=AAAAAtXuShc:APA91bHlgb5Z33CwQpnebRBkhuspsKvrxtsN32lPoiFAdT9QG-8IHK8aLcqh-0vWIBaOyRp8HUkSJoe_u8x8oUFHUUSrghoydhZZ1sUTmAg1f7gQ_3ohTlGxAFzjjFPOaH2ASs1bAjeu"
    }
    ```

3. Luego, al presionar Send, la notificación debería aparecer en la pantalla si es que la aplicación se encuentra en segundo plano (gracias al service worker).
