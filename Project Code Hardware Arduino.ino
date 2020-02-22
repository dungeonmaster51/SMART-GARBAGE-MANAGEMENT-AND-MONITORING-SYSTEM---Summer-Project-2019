#define trigPin 2//ultrasonic pins 
#define echoPin 3
#include <LiquidCrystal.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "RTClib.h"


int mq7;
char buf1[16];
String strmq7;

int i;
char buf2[16];
String stri;
// replace with your channel's thingspeak API key
String apiKey = "TBUZUXL8G360O9SY";

SoftwareSerial ser(5, 6); // RX, TX//esp8266 pin

char inchar; // Will hold the incoming character from the GSM shield

int count6 =0;
int timesTosend=1;
int numring=0;
int comring=3;
int onoff=0; // 0 = off, 1 = on


// initialize the library with the numbers of the interface pins
RTC_DS1307 rtc; //rtc variable


LiquidCrystal lcd(A0, A1, A2, 10, 11, 12);//lcd pin rs,en.d4,d5,d6,d7
Serial.println("AT+CMGF=1");//at comannds for esp8266
delay(500);
 
  ser.begin(115200);
 
  // reset ESP8266
  ser.println("AT+RST");//at commands for esp8266
  delay(500);
  ser.println("AT+CWMODE=3");//at commands for esp8266
  delay(500);
  ser.println("AT+CWJAP=\"dlink\",\"leomessi99\"");//at comands for esp8266
  delay(500);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
 
  pinMode(mq7, INPUT);

  pinMode(4,OUTPUT);
  digitalWrite(4,LOW);

if (! rtc.begin())//checking if rtc is available or not 
  {
    lcd.print("Couldn't find RTC");
    while (1);
  }

  if (! rtc.isrunning())
  {
    lcd.print("RTC is NOT running!");
  }
 
rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
 
}

void loop()
{
  //Ultrasonic
  long duration, distance;// this code for ultrasonic which convert signal into cm 
  digitalWrite(trigPin, LOW);  // Added this line
  delayMicroseconds(2); // Added this line
  digitalWrite(trigPin, HIGH);
  //delayMicroseconds(1000); - Removed this line
  delayMicroseconds(10); // Added this line
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;//conversion formula
  delay(200);
 
  Serial.print("distance =");
  Serial.print(distance);
  Serial.println(" cm");
  delay(100);
  lcd.setCursor(0, 0);
  lcd.print("D =");
  lcd.setCursor(7, 0);
  lcd.print(distance);
  lcd.print("    ");
  delay(100);

DateTime now = rtc.now();//rtc code for checking time 
Serial.println(now.second());
if(distance<6)//if distbin is full 
  {
if(now.second()==60){//if dustbin is full for about 1 minute
   
 
    digitalWrite(4,HIGH);
    delay(2000);
    digitalWrite(4,LOW);
    Serial.println("Dustbin Full");
    count6 = 0;
while(count6<timesTosend){// code for sending msg to the mobile number 
delay(1500);
Serial.print("AT+CMGS=\"");//at commands for gsm 
Serial.print("8076079529");
Serial.println("\"");
while (Serial.read()!='>');
{
Serial.print("Dustbin Full");  //SMS body
delay(500);
Serial.write(0x1A);  // sends ctrl+z end of message
    Serial.write(0x0D);  // Carriage Return in Hex
Serial.write(0x0A);  // Line feed in Hex

//The 0D0A pair of characters is the signal for the end of a line and beginning of another.
delay(5000);

}
count6=1;
}
}
  }
  if(analogRead(A3)>=700)
  {
  digitalWrite(4,HIGH);
  delay(2000);
  digitalWrite(4,LOW);
  }
  //WiFi
  mq7= analogRead(A3);
  lcd.setCursor(0, 1);
  lcd.print("Q7: ");
  lcd.print(mq7);
  // convert to string
  strmq7 = dtostrf(mq7, 4, 1, buf1);    

  Serial.print(strmq7);
  Serial.print(" ");
 
  // TCP connection
  String cmd = "AT+CIPSTART=\"TCP\",\"";
  cmd += "184.106.153.149"; // api.thingspeak.com//thingspeak ip address
  cmd += "\",80";
  ser.println(cmd);
  if(ser.find("Error"))
  {
    Serial.println("AT+CIPSTART error");
    return;
  }
 
  // prepare GET string
  String getStr = "GET /update?api_key=";//code for sending data to thingpeak account for gas 
getStr += apiKey;
  getStr +="&field1=";
  getStr += String(strmq7);
  getStr += "\r\n\r\n";

  // send data length
  cmd = "AT+CIPSEND=";
  cmd += String(getStr.length());
  ser.println(cmd);
  if(ser.find(">"))
  {
    ser.print(getStr);
  }
  else
  {
    ser.println("AT+CIPCLOSE");
    // alert user
    Serial.println("AT+CIPCLOSE");
  }
  // thingspeak needs 15 sec delay between updates
 delay(6000);  
 //WiFi
  mq7= analogRead(A3);
  i= distance;
  lcd.setCursor(0, 1);
  lcd.print("Q7: ");
  lcd.print(mq7);
  // convert to string
  strmq7 = dtostrf(mq7, 4, 1, buf1);    
stri = dtostrf(i, 4, 1, buf2);  
  Serial.print(strmq7);
  Serial.print(" ");
  Serial.print(stri);
  Serial.print(" ");
  // TCP connection
  String cmd1 = "AT+CIPSTART=\"TCP\",\"";
  cmd1 += "184.106.153.149"; // api.thingspeak.com
  cmd1 += "\",80";
  ser.println(cmd1);
  if(ser.find("Error"))
  {
    Serial.println("AT+CIPSTART error");
    return;
  }
 
  // prepare GET string
  String getStr1 = "GET /update?api_key=";//code for sending the data of filling of dustbin
  getStr1 += apiKey;
  getStr1 +="&field2=";
  getStr1 += String(stri);
  getStr1 += "\r\n\r\n";

  // send data length
  cmd1 = "AT+CIPSEND=";
  cmd1 += String(getStr1.length());
  ser.println(cmd1);
  if(ser.find(">"))
  {
    ser.print(getStr1);
  }
  else
  {
    ser.println("AT+CIPCLOSE");//when data is send need a notification
   // alert user
    Serial.println("AT+CIPCLOSE");
  }
  // thingspeak needs 15 sec delay between updates
 delay(6000);    
}
