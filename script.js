var grid = document.getElementById('LedGrid');
var row;
var element;
var isConnected;
var LedMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];
let port;
let writer;

// creates the grid
for(let i = 0; i < 8 ;i++){
    row = document.createElement('div');
    row.classList.add('LedRow')
    for(let j = 0; j < 8; j++) {
        element = document.createElement('div');
        element.classList.add('LedElement');
        element.setAttribute('id',`${i}${j}`);
        element.addEventListener('click',()=>{toggle(i,j)});
        row.appendChild(element);
        
    }
    grid.appendChild(row);
}
console.log("script loaded");

//toggles a pixel on or off
function toggle(row,col){
    var ClickedElement=document.getElementById(`${row}${col}`);
    if(ClickedElement.classList.contains('toggled')){
        ClickedElement.classList.remove('toggled');
        LedMatrix[row][col]=0;
    } else {
        ClickedElement.classList.add('toggled');
        LedMatrix[row][col]=1;
    }
    //if it's connected, will send command to arduino
    if(isConnected){
        writer.write(new TextEncoder().encode(`${row}${col}`));
        console.log(`Draw pixels ${row},${col} command sent to serial`);
    }
}

// clears all the active pixels
function clearAll(){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let ClickedElement=document.getElementById(`${i}${j}`);
            if(ClickedElement.classList.contains('toggled')){
            ClickedElement.classList.remove('toggled');
            LedMatrix[i][j]=0;
            }
        }
    }
    //if it's connected, will send command to arduino
    if(isConnected){
        writer.write(new TextEncoder().encode('cl'));
        console.log('Clear Pixels (cl) command sent to serial');
    }
}

async function connect() {
    console.log('Connecting to Serial...');
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        writer = port.writable.getWriter();

        isConnected = true;
        document.getElementById('status').innerHTML = 'Connected';
        document.getElementById('connect').disabled = true;
        console.log('Connected');
        clearAll(); //clears the matrix to ensure coerence between arduino and website 
        
    } catch (error) {
        console.error('Error:', error);
    }
}