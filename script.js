var grid = document.getElementById('LedGrid');
var row;
var element;
var isConnected;
var LedMatrix = new Uint8Array();
LedMatrix = [
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

function toggle(row,col){
    console.log(`Clicked row ${row}, column ${col}`);
    var ClickedElement=document.getElementById(`${row}${col}`);
    if(ClickedElement.classList.contains('toggled')){
        ClickedElement.classList.remove('toggled');
        LedMatrix[row][col]=0;
    } else {
        ClickedElement.classList.add('toggled');
        LedMatrix[row][col]=1;
    }
    if(isConnected){
        //console.log(LedMatrix);
        writer.write(new TextEncoder().encode(`${row}${col}`));
        //console.log(`${row},${col}`);

    }
}

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
        
    } catch (error) {
        console.error('Error:', error);
    }
}