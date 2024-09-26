// Sensor class contains: stored sensor data, color data
//    is a superclass of: Temperature, Moisture, Light
#ifndef SENSOR_H
#define SENSOR_H
#include "Arduino.h"
#include <string.h>
#include <stdio.h>
using namespace std;


#include "MCU.h"


// TODO push average to Firestore
// ? Measurement units? 
// Abstract class sensor contains: 
//           avgData - average data that is pushed to DB and flushed, only Sensor methods access this
//           dataAccumulator - data gathered from one sensor (to be averaged), flushed after avgData pushes to DB
class Sensor  
{
    protected: 
        Sensor() {} // can't instantitate Sensor
        const MCU* _mcu = MCU::Instance();
    public:
        // {temperature (F), light (idk unit), moisture (idk)}
        float avgData = 0.0; 
        int dataAccumulator = 0;

        // set sampling frequency
        virtual int setFreq(int) const = 0; // pure virtual, implement in subclass
                                            // can't make Sensor object

        // color data - changes based on color value set by different sensors
        static vector<int> color[3]; //stored as RGB only (for now)
        // update RGB data
        virtual std::vector<int> updateColor(vector<int> &color) = 0;
        // reset RGB data
        void resetColor(vector<int> &color) {color = {0,0,0};};
        
        // destructor - virtual ensures base and derived get destroyed
        virtual ~Sensor() = default;
};

// Moisture class contains: soil wetness data, (pH data?)
// ? Is soil wetness available as a gradient?
class Moisture:public Sensor {
    public:
        int freq;
        int setFreq(int arg) const {
            int freq = arg;
            return freq;
        }
        std::vector<int> updateColor(vector<int> &color) { 
            color = {30,144,255}; // Dodger Blue = Bad (soil moisture is a concern)
            return color;
        }
        double readSensor();
};

// Temperature class contains: time series temperature data
// ? How does radiation affect temperature reading?
class Temperature:public Sensor {
    public:
        int freq;
        int setFreq(int arg) const {
            int freq = arg;
            return freq;
        }
        std::vector<int> updateColor(vector<int> &color) {
            color = {251,183,65}; // Fire Color = Bad (temperature is a concern)
            return color;
        }
};

// Light class contains: sun intensity data, sun time series data, 
//          (sun position data - for suggesting best spot in room?)
// TODO photo cell vs phototransistor (LDR)
//      LDR will be permanently damaged by high temps maybe?
//      (grey filter?)
// TODO hysteresis && damping for partly cloudy days
class Light:public Sensor {
    public:
        int freq;
        int setFreq(int arg) const {
            int freq = arg;
            return freq;
        }
        std::vector<int> updateColor(vector<int> &color) {
            color = {250,253,15}; // Sun Color = Bad (light is a concern)
            return color;
        }
};

#endif