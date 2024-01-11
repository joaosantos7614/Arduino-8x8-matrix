int row[] = {9,11,16,10,8,15,7,14}; //rows matrix pins (with 220R resistor)
int col[] = {5,17,18,6,19,2,3,4}; //collumns matrix pins
int cursorX;
int cursorY;
int ledMatrix[8][8]; //this is the matrix that is repeatedly read and drawn on the led matrix

void setup() {
  for(int i=0;i<8;i++){      //sets the pins used by the led matrix as outputs
    pinMode(row[i],OUTPUT);
    pinMode(col[i],OUTPUT);
  }
  pinMode(13,OUTPUT); //unneeded, it's here just to turn off the built in led
  Serial.begin(9600); 
  initializeMatrix(); // sets the initial state for the output pins
}

void loop() {
  //checks for serial data
  if (Serial.available() >= 2) {
    char charA = Serial.read();
    char charB = Serial.read();
    //checks for clear command (cl)
    if(charA=='c'&&charB=='l'){
      initializeMatrix();
    }else{ //toggles pixel at 'xy'
      cursorX = charA -'0';   //simple way to convert the ASCII charA to the corresponding integer: '0' to 0, and '1' to 1
      cursorY = charB -'0';
      toggleDot(cursorX,cursorY);
    }
  }
  drawMatrix();
}

//funcion to draw the matrix stored in the variable 'ledMatrix'
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

//function to change the state of a specific led on the 'ledMatrix' variable
void toggleDot(int a, int b){
  if(ledMatrix[a][b]==1)
  {
    ledMatrix[a][b]=0;
    }
  else
  {
    ledMatrix[a][b]=1;
  };
}

//function to set the initial state of the IO pins and setting the matrix to zeroes
void initializeMatrix(){
  for(int i=0;i<8;i++)
  {
    for(int j=0;j<8;j++)
    {
      ledMatrix[i][j]=0;
      digitalWrite(row[i],LOW);
      digitalWrite(col[j],HIGH);
    }
  }
}
