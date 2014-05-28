/*

NETLab Toolkit sketch for Intel Galileo
http://netlabtoolkit.org/

by Philip van Allen and Andrew Nagata

This software is paired with a Linux side NodeJS server.js file to provide control over the Galileo Arduino
It uses a simple HTTP Rest protocol to allow read and write access to analog, digital and servo functions
E.g. http://10.0.1.113/arduino/analog/0 which generates a response with the value for analog input 0

* Allows simple access via HTTP Rest commands
* Implements a user function stub that provides for user code to read and write in any way the user chooses
* Supports the entry of Linux commands via the Arduino IDE USB connection Serial Monitor (especially useful 
  determining the IP address of Ethernet or WiFi connected via DHCP - just type in "ifconfig"

Possible commands are listed here:

"digital/13"     -> digitalRead(13)
"digital/13/1"   -> digitalWrite(13, HIGH)
"analog/2/123"   -> analogWrite(2, 123)
"analog/2"       -> analogRead(2)
"analog/99       -> generates a response for first 6 analog inputs in a single response - e.g. 100 110 120 130 140 150
"servo/3/180     -> servo.write(180) - there is an issue with Galileo servo implementation where this only works on port 3
"user/0"         -> the user URLs provide a method stub for users to create their own read and write code interface
"user/0/100"     -> e.g. this could be used to talk to an I2C device
"mode/13/input"  -> pinMode(13, INPUT)
"mode/13/output" -> pinMode(13, OUTPUT)

The approach of this sketch is based loosely on the Arduino Yun Bridge example.

Code is freely provided

*/

#include <Wire.h>
#include <Servo.h>

#define ANALOG_MAX 5
#define MAX_SERVOS 5

// set up servo objects
Servo servos[MAX_SERVOS];

String command = "";
String clearCommand = "none";
char output[64];
char response[64];

// added for user code
int lastAnalog = -1;
int threshold = 500;

void setup() {
  Serial.begin( 9600 );
  Serial.println("START UP");

  // Next line assigns an ip address to the Galileo Ethernet port for connecting directly to a computer with no router
  // Comment this line out if you are connecting the Galileo Ethernet to a network with DHCP, make line active if connecting directly to a computer
  system("ifconfig eth0 192.168.2.2 netmask 255.255.255.240 up"); // assign a fixed IP to Ethernet - 169.254.1.3 works when connected directly to a Mac
  system("route add default gw 192.168.2.3 eth0");
  system("echo \"nameserver 8.8.8.8\" > /etc/resolv.conf");
  system("ntpdate pool.ntp.org");
  system("export TZ=\"UTC+10\"");
  system("node /home/root/server.js &"); // start up the NodeJS server as a separate process
  system("ifup wlan0"); // start up the WiFi
  

  pinMode(13, OUTPUT);
}

void loop() {
  getHTTPRequest();
  getHTTPResponse();
  getShellCommand();
  delay(5);
}

void userCommand(String params) {
  // function stub that allows user to add their own code to respond to read and write commands
  // e.g. http://169.254.1.3/arduino/user/0 is a read request, http://169.254.1.3/arduino/user/0/100 is a write request
  int pin, value;
  pin = getPin(params);
  value = getValue(params);

  if( value == -1 ) { // read request in the form http://ipaddress/arduino/user/pin
    // your code goes here to generate a read value, using the "pin" variable as a parameter
  } else { // write request in the form http://ipaddress/arduino/user/pin/value
    // your code goes here to write the passed pin and value
    //
    // Example code to send a command to another device
    // replace the arduinoCommand IP address to the IP of the device you want to communicate with
    // set the arduinoCommand part after the IP address to the command you want to send
    // the example command sets digital PWM port "pin" to a level based on "value"
     
    String arduinoCommand = "http://127.0.0.1/arduino/analog/";
    arduinoCommand += pin;
    arduinoCommand += "/";
    arduinoCommand += value;
    sendCommand(arduinoCommand);
  }

  // return a response
  String str = String(value);
  sendResponse( str );

}

void getHTTPRequest() {
  char charBuff[64];
  // Read file that has most recent http request command
  FILE *fp;
  fp = fopen("home/root/command", "r");
  if (fp == NULL) {
    //Serial.println ("no commands present");
    command = "";
  } else {
    //Get the command
    fgets(output, 64, fp);
    fclose(fp);

    command = output;

    if (command != "none") {
      // put "none" in command file so we don't look at it again until a new command arrives
      clearCommand.toCharArray(charBuff, 64);
      fp = fopen("/home/root/command", "w");
      fputs( charBuff, fp );
      fclose(fp);

      //Serial.print("got command: ");
      //Serial.println(command);
      processCommand( command );
    } else {
      command = "";
    }
  }
}

void getHTTPResponse() {
  char charBuff[64];
  // Read file that has most recent http request command
  FILE *fp;
  fp = fopen("/home/root/arduinoresponse", "r");
  if (fp == NULL) {
    //Serial.println ("no commands present");
    command = "";
  } else {
    //Get the command
    fgets(output, 64, fp);
    fclose(fp);

    command = output;

    if (command != "none") {
      // put "none" in command file so we don't look at it again until a new command arrives
      clearCommand.toCharArray(charBuff, 64);
      fp = fopen("/home/root/arduinoresponse", "w");
      fputs( charBuff, fp );
      fclose(fp);

      //Serial.print("got command: ");
      //Serial.println(command);
      processResponse( command );
    } else {
      command = "";
    }
  }
}

void processCommand( String path ) {
  // read the command
  int ind = path.indexOf("/");
  String arduinoCommand = path.substring(0, ind);
  int p = path.length();
  String params = path.substring(ind+1, p);

  if (arduinoCommand == "digital") {
    digitalCommand(params);
  } else if (arduinoCommand == "analog") {
    analogCommand(params);
  } else if (arduinoCommand == "servo") {
    servoCommand(params);
  } else if (arduinoCommand == "mode") {
    modeCommand(params);
  } else if (arduinoCommand == "user") {
    userCommand(params);
  } else { 
    // unknown command
    sendResponse( " " );
  }
}

void processResponse( String response ) {
  Serial.println(response);
}


void digitalCommand(String params) {
  int pin, value;
  pin = getPin(params);
  value = getValue(params);

  if( value == -1 ) { // read request
    value = digitalRead(pin);
  } else { // write request
    digitalWrite( pin, value );
  }

  String str = String(value);
  sendResponse( str );
}

void analogCommand(String params) {
  int pin, value;
  String values = "";
  pin = getPin(params);
  value = getValue(params);

  if( value == -1 ) { // read request
    if (pin == 99) {  // send back all analog values, e.g. 100 110 120 130 140 150
      for (int i=0; i <= ANALOG_MAX; i++) {
        value = analogRead(i);
        values += String(value);
        if (i < ANALOG_MAX) values += " ";
      }
    } else { // Send feedback to client for individual analog
      value = analogRead(pin);
    }
  } else { // write request
    if (value > 255) value = 255;
    analogWrite( pin, value );
  }

  //This is a quick hack -- need a write method that fputs values
  String str;
  if( pin != 99 ) {
    str = String(value);
  } else {
    str = values;
  }

  sendResponse( str );
}

void servoCommand(String params) {
  int pin, value;
  
  pin = getPin(params);
  value = getValue(params);

  if( value != -1 ) { // write request
    if (pin < MAX_SERVOS) {
      if (!servos[pin].attached()) {
        //Serial.println("attaching");
        servos[pin].attach(pin);
      }
      servos[pin].write(value);
    }
  } // ignore read requests
  
  String str = String(value);
  sendResponse( str );
}


void modeCommand(String params) {
  int response = 1;

  int pInd = params.indexOf("/");
  int pin = params.substring(0,pInd).toInt();
  String mode = params.substring(pInd+1, params.length());

  if (mode == "input") {
    pinMode(pin, INPUT);
  } else if (mode == "output") {
    pinMode(pin, OUTPUT);
  } else {
    response = 0;
  }

  String str = String(response);
  sendResponse( str );
}

void sendResponse( String str ) {

  String fullResponse = command;
  // format response e.g.: analog/99#100 110 120 130 140 150\n
  // this format allows the server to split on "#" and ensure the response is for the command it sent
  fullResponse += "#";
  fullResponse += str;
  fullResponse += "\n";

  char charBuff[64];
  fullResponse.toCharArray(charBuff, 64);

  FILE *fp;
  fp = fopen("/home/root/response", "w");
  fputs( charBuff, fp );
  fclose(fp);
}

void sendCommand( String str ) {
  String fullResponse;
  
  fullResponse += str;
  fullResponse += "\n";

  char charBuff[64];
  fullResponse.toCharArray(charBuff, 64);

  FILE *fp;
  fp = fopen("/home/root/arduinocommand", "w");
  fputs( charBuff, fp );
  fclose(fp);
}


void getShellCommand() {
  String inData = "";
  char cmd[64];
  while (Serial.available() > 0)
    {
        char recieved = Serial.read();

        // Process message when new line character is recieved
        if (recieved == '\n')
        {
            Serial.print("Shell Command$ ");
            Serial.println(inData);
            
            inData += " > /dev/ttyGS0"; // send command output to serial port
            inData.toCharArray(cmd,inData.length() + 1);
            system(cmd);
            
        } else {
          inData += recieved;
        }
    }
}

int getPin(String params) {
  int pin;
  if( params.indexOf("/") == -1 ) { // no value
    pin = params.toInt();
  } else { // has pin and value
    int pInd = params.indexOf("/");
    pin = params.substring(0,pInd).toInt();
  }
  return pin;
}

int getValue(String params) {
  int value;
  if( params.indexOf("/") == -1 ) { // no value
    value = -1;
  } else { // has pin and value
    int pInd = params.indexOf("/");
    value = params.substring(pInd+1, params.length()).toInt();
  }
  return value;
}
