# Actualización Sonoff Pow Firmware

  Este tutorial explica las consideraciones y pasos a realizar para modificar el Firmware utilizado en los dispositivos Sonoff Pow.

  Estos dispositivos sirven para el control de artefactos eléctricos, permitiendo además la telemetría del consumo eléctrico. El corazón de este dispositivo es el chip ESP8266, el cual permite la comunicación y procesamiento de las mediciones adquiridas por los sensores para luego ser replicadas en diferentes servidores a través de Wifi. El disposito cuenta con un botón, un relé para el control remoto y sensores que cuantifican los valores de voltaje ,corriente, potencia, factor de potencia y consumo energético (kWh).


  Sonoff predeterminadamente se conecta con un servicio (servidor) privado mantenido por la empresa desarrolladora del dispositivo. Con el fin de utilizar un servicio propio nace la necesidad de actualizar o modificar el Firmware del dispositivo, por uno que permita establecer la configuración para la conexión WiFi y la conexión hacia el servidor.

  Esta actualización se realiza a través del puerto de comunicación FTDI de la placa, la cual permite la conexión del dispositivo con un ordernador encargado de enviar el nuevo código. El Firmware a utilizar será Sonoff-Tasmota, éste permite el normal funcionamiento del dispositivo, sumando a un conjunto de comandos que permiten modificar la configuración, el control y análisis de datos, a través múltiples protocolos de acceso como Serial, MQTT y una Interfaz Web.

***

## Requerimientos Previos

#### Requerimientos de Hardware

+ Contar con un disposito Sonoff Pow (ESP8266)
+ Conversor FTDI a USB Serial de 3.3V
+ Soldar Pines en los puertos FTDI de la placa

#### Requerimientos de Software  
+ Instalar [Arduino IDE](https://www.arduino.cc/en/main/software)
+ Descargar e instalar MQTT Broker y MQTT Cliente de Prueba
+ Descargar Firmware [Sonoff-Tasmota version 5.14.0](https://github.com/arendst/Sonoff-Tasmota/archive/v5.14.0.zip)

***

## Preparación de Hardware

1. En un primer paso es necesario soldar los pines In/Out en el puerto de comunicación FTDI del dispositivo Sonoff, como se muestra en la siguiente imagen.

![FTDI](https://raw.githubusercontent.com/krouw/Sonoff-Tasmota-Domergy/master/images/FTDI.jpg "FTDI")

2. Conectar el Conversor FTDI a USB Serial utilizando el siguiente orden

| Conversor     | Módulo Sonoff |
| ------------- |:-------------:|
| 3V3     | 3V3 / VCC |
| TX      | RX      |
| RX  | TX     |
| GND | GND     |

### ** **Atención**

+ No conectar el VCC al mismo tiempo que el Voltaje AC (No medir y programar al mismo tiempo), ya que esto puede dañar el dispositivo.

+ El orden de la conexión del Voltaje AC que permite la medición es el siguiente

Lo-E-E-N-N-Li = LineOut-EarthOut-EarthIn-NeutralOut-NeutralIn-LineIn

![TomaCorriente](https://raw.githubusercontent.com/krouw/Sonoff-Tasmota-Domergy/master/images/TomaCorriente.jpg "TomaCorriente")

***

## Preparación de Software

1. Una vez finalizada la preparación el Hardware es necesario instalar y abrir el programa Arduino IDE.

2. En el Arduino IDE, instalaremos la extensión ESP8266 que brinda soporte para la plataforma Arduino a las placas construidas con este chip. Para ello iremos a ```Archivo -> Preferencias``` y en la entrada *'Gestor de URLs Adicionales de Tarjetas'* agregamos el siguiente link ```http://arduino.esp8266.com/stable/package_esp8266com_index.json``` y seleccionamos *'OK'*.

3. Luego de agregada la URL es necesario dirigirse a ```Herramientas -> Placa -> Gestor de Tarjetas```, una vez dentro buscamos la extensión *esp8266 by ESP8266 Community* ( Recordar la versión que se está instalando ) y le damos click a instalar. Una vez finalizada la instalación cerramos la ventana.

4. Finalizada la instalación de la extensión es necesario descargar y descomprimir el Firmware Sonoff-Tasmot, dentro de esta carpeta encontramos todos los archivos necesarios para instalar el Firmware.

5. En un principio agregaremos las librerías requeridas por el Firmware, para esto iremos al directorio ```Sonoff-Tasmota -> lib ``` y copiaremos todas las carpetas en Arduino/libraries para que estén disponibles en el Arduino IDE.

   ``` Carpeta Arduino/libraries Windows: C:\Users\NOMBRE_DE_USUARIO\Documents\Arduino\libraries ```

   ``` Carpeta Arduino/libraries MacOS: /Users/NOMBRE_DE_USUARIO/Documents/Arduino/libraries ```

6. Para que nuestro firmware reconozca los dispositivos Sonoff necesitamos que se encuentren disponibles en Arduino IDE. Para esto reemplazaremos los archivos boards.txt y platform.txt de la extensión ESP8266.

##### Copiar Archivo

###### ESP8266 version anterior a la 2.4.0

+ Ir a la carpeta del Firmware ``` Sonoff-Tasmota -> Arduino -> version 2.3.0 ``` copiar el archivo boards.txt y reemplazar por el archivo que se encuentra en la carpeta de la extensión ESP8266.

   ``` Carpeta ESP8266 Windows: C:\Users\NOMBRE_DE_USUARIO\AppData\Local\Arduino15\packages\esp8266\hardware\esp8266\2.3.0 ```

   ``` Carpeta ESP8266 MacOS: /Users/NOMBRE_DE_USUARIO/Library/Arduino15/packages/esp8266/hardware/esp8266/2.3.0 ```

###### ESP8266 version 2.4.0

+ Ir a la carpeta del Firmware ``` Sonoff-Tasmota -> Arduino -> version 2.4.0 ``` copiar el archivo platform.txt y reemplazar por el archivo que se encuentra en la carpeta de la extensión ESP8266.

   ``` Carpeta ESP8266 Windows: C:\Users\NOMBRE_DE_USUARIO\AppData\Local\Arduino15\packages\esp8266\hardware\esp8266\2.4.0 ```

   ``` Carpeta ESP8266 MacOS: /Users/NOMBRE_DE_USUARIO/Library/Arduino15/packages/esp8266/hardware/esp8266/2.4.0 ```

###### ESP8266 version 2.4.1 ( Sólo disponible para la versión 5.13.0 de Sonoff-Tasmota )

+ Ir a la carpeta del Firmware ``` Sonoff-Tasmota -> Arduino -> version 2.4.1 ``` copiar el archivo platform.txt y reemplazar por el archivo que se encuentra en la carpeta de la extensión ESP8266.

   ``` Carpeta ESP8266 Windows: C:\Users\NOMBRE_DE_USUARIO\AppData\Local\Arduino15\packages\esp8266\hardware\esp8266\2.4.1 ```

   ``` Carpeta ESP8266 MacOS: /Users/NOMBRE_DE_USUARIO/Library/Arduino15/packages/esp8266/hardware/esp8266/2.4.1 ```

##### Configuración Arduino IDE

- Seleccionar ``Herramientas`` y configurar la placa siguiendo los atributos de las imágenes.

#### Placa ESP8266 driver version 2.3.0:

![config](https://raw.githubusercontent.com/arendst/arendst.github.io/master/media/arduinoide230b.png "Config")

#### Placa ESP8266 driver version 2.4.0:

![config](https://raw.githubusercontent.com/arendst/arendst.github.io/master/media/arduinoide2b.png "Config")


#### Placa ESP8266 driver version 2.4.1:

![config](https://raw.githubusercontent.com/arendst/arendst.github.io/master/media/arduinoide241b.png "Config")

##### Compilar Firmware

Para comprobar que la configuración está funcionando correctamente verificaremos y compilaremos el Firmware.
Para esto abrimos el archivo ```Sonoff-Tasmota -> sonoff -> sonoff.ino ```. Una vez desplegado el códogp
o en Arduino IDE cliqueamos en ```Verificar/Compilar ```. Si no hay errores nuestro entorno está bien configurado.

##### Configuración Firmware

Dentro del archivo ``` Sonoff-Tasmota -> sonoff -> user_config.h ``` se encuentran las constantes para una configuración inicial del Firmware. Es posiblie actualizar esta configuración una vez cargado el programa por medio de los comandos integrados en el firmware a través de la Web, MQTT y Serial.

Para su correcto funcionamiento es necesario configurar los parámetros referidos al comportamiento del dispositivo, conexión WiFI y comunicación con el servidor MQTT.

```

// -- Project -------------------------------------
#define PROJECT "sonoff"    // Define el ID del dispositivo, como además el nombre del tópico MQTT a utilizar    
#define MODULE SONOFF_POW  // Define el tipo de dispositivo a soportar, según los tipos especificados en sonoff_template.h

// -- Wifi ----------------------------------------
#define WIFI_IP_ADDRESS "10.108.0.21" // Difine la dirección IP estática a registrar en el router. Utilizar "0.0.0.0" para asignar una IP mediante el DHCP server.
#define WIFI_GATEWAY "10.108.0.1" // Si no se utiliza el DHCP server, se define la IP del Gateway.
#define WIFI_SUBNETMASK "255.255.255.0" // Si no se utiliza el DHCP server, se define la máscara de Red.
#define WIFI_DNS "10.108.0.1" // Si no se utiliza el DHCP server, se define la IP del DNS ( Generalmente es la misma IP que el Gateway ).

#define STA_SSID1 "ENERGIA" // Nombre de la Red Wifi Primaria
#define STA_PASS1 "UTEM"  // Contraseña de la Red Wifi Primaria
#define STA_SSID2 "static-sonoff" // Nombre de la Red Wifi Segundaria
#define STA_PASS2 "sonoff" // Contraseña de la Red Wifi Segundaria

// -- MQTT ----------------------------------------
#define MQTT_USE 1 // (0 = Desactivar MQTT, 1 = Activar MQTT)

#define MQTT_HOST "10.108.0.45" // IP servidor MQTT
#define MQTT_PORT 1883 // Puerto MQTT
#define MQTT_USER "DVES_USER" // Usuario MQTT
#define MQTT_PASS "DVES_PASS" // Contraseña MQTT

#define MQTT_FULLTOPIC "%prefix%/%topic%/" // Formato de Tópico MQTT utilizado para la publicación y Subscripción de mensajes.

// %prefix% opciones
#define SUB_PREFIX "cmnd" // Sonoff se Subscribe a %prefix%/%topic% utilizando las constantes de SUB_PREFIX/MQTT_TOPIC y SUB_PREFIX/MQTT_GRPTOPIC

#define PUB_PREFIX  "stat"  // Sonoff publica a %prefix%/%topic% utilizando las constantes de PUB_PREFIX/MQTT_TOPIC

#define PUB_PREFIX2 "tele" // Sonoff publica a %prefix%/%topic% utilizando las constantes de PUB_PREFIX2/MQTT_TOPIC

// %topic% opciones
#define MQTT_TOPIC PROJECT // Tópico único MQTT
#define MQTT_GRPTOPIC "sonoffs" // Tópico del Grupo de Sonoff
#define MQTT_CLIENT_ID "DVES_%06X" // ID Cliente MQTT

// -- MQTT - Telemetry ----------------------------
#define TELE_PERIOD 60 // Intervalo en segundos de envío de telemetrías.
0 = Desactivado


```

> Archivo [user_config.h v5.12.0 completo](https://github.com/arendst/Sonoff-Tasmota/blob/040a7adaf18ac30241a09895b899bf922ed61cdc/sonoff/user_config.h
)
***

## Cargar Firmware en Sonoff

Arduino IDE utiliza una interfaz Serial para cargar el firmware en el dispositivo Sonoff. En Windows estas interfaces se llaman COM1, COM2, etc. En Linux estas interfaces son llamadas /dev/ttyUSB0, /dev/ttyUSB1, etc.

Antes de Subir nuestro código es necesario comprobar a cual interfaz Serial está conectado el dispositivo. Conectamos el dispositivo por USB al ordenador y en Arduino IDE ingresamos a ``` Herramientas -> Puerto ``` y seleccionamos la inferfaz que corresponda al Sonoff.

##### Encender modo *Carga de Firmaware* en Sonoff

+ Al realizar una carga de Firmware, no conectar el dispositivo a AC, sino utilizar la fuente de alimentación de la interfaz serial FTDI.

+ Activamos el modo de carga manteniendo presionado el botón del dispositivo y lo conectamos a la interfaz serial. (Se debe mantener el botón pulsado durante toda la carga)

+ Con el botón pulsado conectamos el dispositivo por USB al ordenador y en el Arduino IDE cliqueamos en ```
Subir ```. (Recordar siempre mantener pulsado el botón del dispositivo hasta que finalice la carga).

+ Una vez finalizada la carga es necesario reiniciar el dispositivo desconectando la TomaCorriente.

+ Para comprobar el estado del dispositvo a través de la Interfaz Web, ingresando por medio del navegador a la URL http://IP_DEL_DISPOSITIVO o comprobando la comunicación entre el dispositivo y el MQTT broker.

***

## Instalación Broker

El Servidor mqtt de prueba se encuentra en la carpeta broker.
Para levantar el servidor es necesario instalar
[NodeJS en su versión LTS](https://nodejs.org/es/download/). Una vez instalado, por medio de la terminal ingresamos a la carpeta *broken* y ejecutamos el comando ``$ npm install `` (Este comando instalará las dependencias necesarias para el broker). Una vez instaladas las dependecias corremos el servidor ejecutando `` $ node index.js `` y comprobamos que los mensajes lleguen al broker.

> Es posible interactuar con el dispositivo mediante el script client.js, el cual publica mensajes que ejecutan comandos en el dispositivo.

***

## Calibración

#### Requisitos

1. Multitester calibrado (Voltímetro y Amperímetro)
2. Wattmetro (Opcional)
3. Una carga con una potencia conocida.

#### Pasos

1. Abrir el navegador con dos ventanas:
    - La pagina principal del sonoff
    - La consola del sonoff
2. Encender  y esperar hasta que la lectura de los instrumentos se estabilice.
3. Ahora comparar las mediciones de los instrumentos con las señaladas por el sonoff.
4. Si se necesita realizar un ajuste, ir a la consola del sonoff y ejecutar alguno de los siguientes comandos:

Para Voltaje: `cmnd/%TOPIC%/VoltageSet %METER%`
Para Corriente: `cmnd/%TOPIC%/CurrentSet %METER%`
Para Potencia: `cmnd/%TOPIC%/PowerSet %METER%`

Donde:
- `%TOPIC%` es el topic del dispositivo sonoff.
- `%METER%` es la unidad entregada por los instrumentos calibrados.

***

## Sonoff-Tasmosta Wiki

+ [Sonoff-Tasmota GitHub Project](https://github.com/arendst/Sonoff-Tasmota)
+ [Sonoff-Tasmota Wiki](https://github.com/arendst/Sonoff-Tasmota/wiki)
+ [Comportamiento Botón Sonoff](https://github.com/arendst/Sonoff-Tasmota/wiki/Button-usage)  
+ [Configuración MQTT](https://github.com/arendst/Sonoff-Tasmota/wiki/MQTT-Features)  
+ [Comandos Sonoff-Tasmota](https://github.com/arendst/Sonoff-Tasmota/wiki/Commands)  
