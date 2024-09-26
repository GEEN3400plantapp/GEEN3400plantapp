// GEEN 3400 Project Code
// Graham Williams | grwi2594@colorado.edu
// Bryan Sirner
// Prototype #1
#include <Arduino.h>
#include <iostream>
#include <WiFi.h>
#include <HTTPClient.h>
#include <string>
#include <ArduinoJson.h>

#include "MCU.h"
#include "Sensor.h"

// int dataTime = 2;


// float inputVoltage = 3.3; // Voltage input to the Temp sensor (left pin looking at flat)

// float calibration = 12;

// initialize MCU and Sensor objects
MCU nodeMCU();
Temperature* tempSensor = new Temperature;
Moisture* moistSensor = new Moisture;
Light* lightSensor = new Light;

// Hardcoded wifi
const char* ssid = "fuckxfinity";
const char* password = "Jollymango1@";

const char* serverName = "https://potbut-d8c82.uc.r.appspot.com/pot";

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

const char* rootCACert = \
"-----BEGIN CERTIFICATE-----\n" \
"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\n" \
"-----END CERTIFICATE-----\n";

void setup()
{
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected to WiFi network");
}

void loop()
{
  moistSensor->setFreq(1);

  double reading = moistSensor->readSensor();
  

  if  ((millis() - lastTime) > timerDelay) {
    if (WiFi.status()== WL_CONNECTED) {
      WiFiClientSecure client;

      client.setCACert(rootCACert);


      HTTPClient http;

      http.setFollowRedirects(HTTPC_FORCE_FOLLOW_REDIRECTS);

      DynamicJsonDocument doc(2048);
      doc["water"] = reading;

      // Serialize JSON document
      String json;
      serializeJson(doc, json);

      // Send request
      http.begin(client, serverName);
      http.POST(json);

      Serial.println(reading);
      Serial.println(http.getString());

      lastTime = millis();
    }
  }






  // for (int i = 0; i < (dataTime * samplingFreq); i++)
  // {
  //   delay(1000 / samplingFreq); // Time interval between measurments

  //   // converting that reading to voltage, for 3.3v arduino use 3.3
  //   float voltage = reading * inputVoltage;
  //   voltage /= 4096.0;

  //   // print out the voltage
  //   //Serial.print(voltage); Serial.println(" volts");

  //   // now print out the temperature
  //   float celsius = (100.0 * voltage) - 50.0 ; //converting from 10 mv per degree wit 500 mV offset
  //   //to degrees ((voltage - 500mV) times 100)
  //   celsius += calibration; //Calibration Value
  //   //Serial.print(temperatureC); Serial.println(" degrees C");
  //   sumC += celsius;

  //   // now convert to Fahrenheit
  //   float fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
  //   //Serial.print(temperatureF); Serial.println(" degrees F");
  //   sumF += fahrenheit;


  //   //SOIL SENSOR CODE
  //   double Wetness = analogRead(SoilPin);
  //   //Serial.print("Soil Wetness = ");  Serial.println(Wetness);
  //   soilSum += Wetness;



  //   //PHOTORESISTOR CODE
  //   //PHOTORESISTOR CODE
  //   double Light = analogRead(LightPin);
  //   //Serial.print("Light = ");  Serial.println(Light);
  //   lightSum += Light;

  // }

  // avgF = sumF / (dataTime * samplingFreq);
  // avgC = sumC / (dataTime * samplingFreq);
  // avgSoil = soilSum / (dataTime * samplingFreq);
  // avgLight = lightSum / (dataTime * samplingFreq);
  
  // if (avgLight < 15)
  // {
  //   int rgb [3] = {255, 244, 0};
  // ledcWrite(c_ledChannel1, rgb[2]);
  // ledcWrite(c_ledChannel2, rgb[1]);
  // ledcWrite(c_ledChannel3, rgb[0]);
  // }
  // else 
  // {
  // int redScale = 0;
  // int greenScale = 0;
  // int blueScale = 0;
  // ledcWrite(c_ledChannel1, blueScale);
  // ledcWrite(c_ledChannel2, greenScale);
  // ledcWrite(c_ledChannel3, redScale);
  // }
}


// TODO translate this to lib, tidy up main{}
// ? is it easy enough to go thru API? j start with direct to DB.