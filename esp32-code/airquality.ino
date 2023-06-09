#include <DHT.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>

// MQTT Broker Details
const char *mqtt_broker   = "192.46.211.177";   // Enter URL or IP Address
const int mqtt_port       = 1884;               // Enter Port Number
const char *mqtt_topic    = "v1/zone/me/telemetry";// Enter Publish Topic Name
const char *mqtt_username = "user1";             // Enter Username
const char *mqtt_password = "password1";  
char jsonBuffer[800];
uint8_t mqttErrCnt = 0;
uint32_t restartTimeout = 0;

#define DHTPIN 32       // GPIO pin connected to the DHT22 data pin
#define DHTTYPE DHT22  // DHT type (DHT11 or DHT22)

// Pin assignments
const int MQ2sensorPin = 36;       // Analog input pin for MQ-2 sensor
const int MQ135sensorPin = 39;       // Analog input pin for MQ-135 sensor
const int MQ2digitalPin = 23;      // Digital output pin of MQ-2 sensor
const int MQ135digitalPin = 21;      // Digital output pin of MQ-135 sensor

//MQ135 slope values
// Define the analog pin connected to the sensor

// Define the resistance and ppm values for calibration
const float MQ135RZERO = 76.63;  // Resistance in clean air
const float MQ135PPMS = 3.027;  // PPM value in clean air

// Define the load resistance used for the sensor
const float MQ2RL_VALUE = 1.0;  // Load resistance in kilo-ohms

// Define the gas concentration curve parameters
const float MQ2RO_CLEAN_AIR = 9.83;  // Sensor resistance in clean air (at 1 ppm H2)
const float MQ2GAS_CURVE = 2.3;     // Gas concentration curve sensitivity

const int rainPinDigital = 22;   // Digital input pin for rain sensor
const int rainPinAnalog = 34;   // Analog input pin for rain sensor

// WiFi credentials
const char* ssid = "IOTLAB";
const char* password = "IOTLAB09";
const char* zone_id = "zone_2";

//Delay
const int delaySeconds = 10;

//Declarations
WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);

//method declarations
void sendMqttData(const char *mqttData);
void waitForComplete(void);

// Constants for rain level calculation
const float calibrationFactor = 0.1;  // Calibration factor for rain level calculation

//second count
#define loopCount = 10;

void setup() {
  // Start the serial communication
  Serial.begin(115200);

  //start dht sensor
  dht.begin();

  // Configure pin modes
  pinMode(MQ2digitalPin, INPUT);
  pinMode(MQ135digitalPin, INPUT);
  //pinMode(sensorPin,INPUT);
  pinMode(rainPinDigital, INPUT_PULLUP);

  // Connect to WiFi Network
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  restartTimeout = millis();
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print('.');
    if(millis() - restartTimeout >= 60000)
    {
      // Restart ESP32 if not able to connect to WiFi network within 60 seconds
      Serial.println("Restarting ESP32");
      delay(1000);
      esp_restart();
    }
  }
  Serial.println("Connected");

// Initialize MQTT Broker1
  client.setServer(mqtt_broker, mqtt_port);
  restartTimeout = millis();
  while(!client.connected())
  {
    if(client.connect(zone_id, mqtt_username, mqtt_password))
    {
      Serial.println("MQTT broker connected");
    }
    else
    {
      Serial.print("Error connecting MQTT broker:");
      Serial.println(client.state());
      delay(2000);
      if(millis() - restartTimeout >= 60000)
      {
        // Restart ESP32 if not able woth MQTT broker within 60 seconds
        Serial.println("Restarting ESP32");
        delay(1000);
        esp_restart();
      }
    }
  }

}



void loop() {



//MQ-2


  // Read the analog value from the sensor
  int MQ2sensorValue = analogRead(MQ2sensorPin);

  // Convert the analog value to a voltage
  //float MQ2voltage = MQ2sensorValue * (5.0 / 1023.0);

  // Calculate the sensor resistance
  //float MQ2sensorResistance = (MQ2RL_VALUE * MQ2voltage) / (5.0 - MQ2voltage);

  // Calculate the gas concentration using the gas concentration curve
  //float flammableConcentration = 0.0;

  // Check if sensor resistance is non-zero before calculating the gas concentration
  //if (MQ2sensorResistance != 0.0) {
    //flammableConcentration = pow(10, (log10(MQ2sensorResistance / MQ2RO_CLEAN_AIR) / MQ2GAS_CURVE));
  //}

  // Check if gas concentration is a valid number
  //if (isnan(flammableConcentration)) {
    //flammableConcentration = 0.0f;
  //}
  float flammableConcentration = map(MQ2sensorValue,0,4095,10,1000);
  
  int MQ135sensorValue = analogRead(MQ135sensorPin);
   // Convert the analog value to a voltage

  // Convert the analog value to a voltage
  float MQ135voltage = MQ135sensorValue * (5.0 / 1023.0);

  // Calculate the resistance of the sensor
  float MQ135resistance = ((5.0 * 10.0) / MQ135voltage) - 10.0;

  // Calculate the ratio using the resistance in clean air
  float MQ135ratio = MQ135resistance / MQ135RZERO;

  // Calculate the ppm value based on the linear equation
  float airQuality = MQ135PPMS * pow(MQ135ratio, -2.879);

  // Read the digital output of the sensor
  bool MQ2digitalOutput = digitalRead(MQ2digitalPin);
  bool MQ135digitalOutput = digitalRead(MQ135digitalPin);

  Serial.print("Flammable ppm:");
  Serial.print(flammableConcentration);
  Serial.print("\tAir Quality ppm:");
  Serial.println(airQuality);

//Rain Sensor


  // Read the digital output of the rain sensor
  bool isRainingDigital = digitalRead(rainPinDigital);

  // Read the analog output of the rain sensor
  int analogValue = analogRead(rainPinAnalog)%4095;

  // Calculate the rain level using a metric
  float rainLevel = analogValue * calibrationFactor;

  // Print the rain status, analog value, and rain level to the serial monitor
  if (!isRainingDigital) {
    Serial.println("It's raining!");
//    Serial.print("Analog Value: ");
//    Serial.println(analogValue);
//    Serial.print("Rain Level: ");
//    Serial.print(rainLevel, 2);
//    Serial.println(" mm/h");
  } else {
    Serial.println("No rain detected.");
  }


//dht22
  

  float temperature = dht.readTemperature();     // Read temperature in Celsius
  float humidity = dht.readHumidity();           // Read humidity

  // Check if any reads failed and exit early (to try again).
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print temperature and humidity values to the Serial Monitor
//  Serial.print("Temperature: ");
//  Serial.print(temperature);
//  Serial.print(" °C\t");
//  Serial.print("Humidity: ");
//  Serial.print(humidity);
//  Serial.println(" %");

  //constructing json data
  memset(jsonBuffer, '\0', sizeof(jsonBuffer)); 
  StaticJsonDocument<800> doc;
  // doc[JSON Token Name] = JSON Value
  doc["ZoneId"] = zone_id;
  doc["Temperature"]      = temperature;
  doc["Humidity"]      = humidity;
  doc["RainLevel"] = rainLevel;
  doc["FlammableConcentration"] = flammableConcentration + 1.0f;
  doc["AirQuality"] = airQuality;
  
  serializeJson(doc, jsonBuffer, sizeof(jsonBuffer));
  if(!client.connected())
  {
    
    reconnect_mqtt();
  }
  if(WiFi.status() != WL_CONNECTED)
  {
    reconnect();
  }

  sendMqttData(jsonBuffer);
  
  Serial.println(jsonBuffer);
  
  delay(delaySeconds*1000);  // Delay between readings
}

// Send data to MQTT broker with publish query
void sendMqttData(const char *mqttData)
{
  if(!client.publish(mqtt_topic, mqttData))
  {
    Serial.println("MQTT:Error Sending Data");
    mqttErrCnt++;
    if(mqttErrCnt >= 5)
    {
      Serial.println("Restarting ESP32");
      delay(1000);
      esp_restart();
    }
  }
  else
  {
    mqttErrCnt = 0;
    //Serial.println("Data sent");
  }
}
void reconnect()
{
WiFi.begin(ssid, password);
  restartTimeout = millis();
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print('.');
    if(millis() - restartTimeout >= 60000)
    {
      // Restart ESP32 if not able to connect to WiFi network within 60 seconds
      Serial.println("Restarting ESP32");
      delay(1000);
      esp_restart();
    }
  }
}
void reconnect_mqtt()
{
   client.setServer(mqtt_broker, mqtt_port);
  restartTimeout = millis();
  while(!client.connected())
  {
    if(client.connect(zone_id, mqtt_username, mqtt_password))
    {
      //Serial.println("MQTT broker connected");
    }
    else
    {
      Serial.print("Error connecting MQTT broker:");
      Serial.println(client.state());
      delay(2000);
      if(millis() - restartTimeout >= 60000)
      {
        // Restart ESP32 if not able woth MQTT broker within 60 seconds
        Serial.println("Restarting ESP32");
        delay(1000);
        esp_restart();
      }
    }
  }

}