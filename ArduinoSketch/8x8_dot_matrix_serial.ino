#include <math.h>

int row[] = {9,11,16,10,8,15,7,14}; //the ones with 220R resistor
int col[] = {5,17,18,6,19,2,3,4}; //blue wires
int cursorX;
int cursorY;
int ledMatrix[8][8] = {
{0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0},
{0,0,0,0,0,0,0,0}};

void setup() {
  for(int i=0;i<8;i++){      //sets pins for led matrix
    pinMode(row[i],OUTPUT);
    pinMode(col[i],OUTPUT);
  }
  pinMode(13,OUTPUT); //just to turn off the built in led
  Serial.begin(9600);
  initializeMatrix(); // sets the initial state for the output pins
}

void loop() {
  if (Serial.available() >= 2) {
    
    char charA = Serial.read();
    char charB = Serial.read();
    if(charA=='c'&&charB=='l'){
      clearAll();
    }else{
      cursorX = charB -'0';
      cursorY = charA -'0';
      toggleDot(cursorX,cursorY);      
    }
  }
  drawMatrix();
}

void drawMatrix(){
  for(int i=0;i<8;i++)
  {
    for(int j=0;j<8;j++)
    {
      if(ledMatrix[i][j]==1)
      {      
        digitalWrite(row[i],HIGH);
        digitalWrite(col[j],LOW);
         
      }
      digitalWrite(row[i],LOW);
      digitalWrite(col[j],HIGH);
    }
  }
}

void toggleDot(int a, int b){
  if(ledMatrix[b][a]==1)
  {
    clearDot(a,b);
    }
  else
  {
    drawDot(a,b);        
  };
}

void drawDot(int a, int b){
  ledMatrix[b][a]=1;
}

void clearDot(int a, int b){
  ledMatrix[b][a]=0;  
}

void clearAll(){
    for(int i=0;i<8;i++)
    {
      for(int j=0;j<8;j++)
      {
        clearDot(i,j);
      }
    }
}

void initializeMatrix(){
  for(int i=0;i<8;i++)
  {
    for(int j=0;j<8;j++)
    {
      digitalWrite(row[i],LOW);
      digitalWrite(col[j],HIGH);
    }
  }
}
