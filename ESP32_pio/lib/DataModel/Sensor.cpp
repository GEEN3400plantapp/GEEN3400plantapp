#include "Sensor.h"

double Moisture::readSensor() {
    int pin = _mcu->c_moisturePin;

    double reading = analogRead(pin);

    return reading;
}

