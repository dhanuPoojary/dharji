let line, isDown, array, delta;
let isRedoing = false;
let units = 10;
let backButton=document.getElementById("backButton");
let rightButton=document.getElementById("rightButton");
let leftButton=document.getElementById("leftButton");
let saveMsg=document.getElementById("saveMsg");

let showUPButtons=document.getElementById('zoomButtons');
let zoomControlButton=document.getElementById('zoomControler')


let canvas = new fabric.Canvas('c');


const setBackground = () => {
    canvas.setBackgroundImage('./image//body.jpg', function () {
        canvas.renderAll();
    });
}
setBackground()

const drawLine = () => {
    canvas.on('mouse:down', function (o) {
        isDown = true;
        let pointer = canvas.getPointer(o.e);
        let points = [pointer.x, pointer.y, pointer.x, pointer.y];
        line = new fabric.Line(points, {
            strokeWidth: 3,
            stroke: 'red',
            fill: 'red',
            height: 10,
            originX: 'center',
            originY: 'center',
            borderScaleFactor: 1,
            dynamicMinWidth: 2,
            lockScalingX: false,
            lockScalingY: true,
            lockRotation: false,
            hasControls: true,
            hasBorders: false,
            lockMovementX: false,
            lockMovementY: false,
            hoverCursor: 'pointer',
            padding: 20
        });
        canvas.add(line);

    });

    canvas.on('mouse:move', function (o) {
        if (!isDown) return;
        let pointer = canvas.getPointer(o.e);
        line.set({ x2: pointer.x, y2: pointer.y });
        canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
        isDown = false;
        canvas.on('selection:created', function (e) {
            e.target.set({
                lockScalingX: false,
                lockScalingY: true,
                padding: 15,
                hasControls: true,
                dynamicMinWidth: 2,
                lockMovementX: false,
                lockMovementY: false,
                lockRotation: false
            });
        });
        canvas.off('mouse:down');
    });
    canvas.on('object:moving', function (o) {
        isDown = false;
    })
}

const storeData = () => {
    const json = canvas.toJSON();
    localStorage.setItem('design', JSON.stringify(json));
    saveMsg.style.display = "block";
    setTimeout(function(){ saveMsg.style.display = "none"; }, 1000)
}

canvas.on('object:added', function () {
    if (!isRedoing) {
        array = [];
    }
    isRedoing = false;
});

const undo = () => {
    if (canvas._objects.length > 0) {
        array.push(canvas._objects.pop());
        canvas.renderAll();
    }
}

const redo = () => {
    if (array.length > 0) {
        isRedoing = true;
        canvas.add(array.pop());
    }
}
const addLine = () => {
    drawLine();
}

const deleteLine = () => {
    canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj)
    });
    canvas.discardActiveObject().renderAll()
}

const reset = () => {
    canvas.clear();
    setBackground();
}

const getData = () => {
    leftButton.style.display = "none";
    rightButton.style.display = "none";
    document.getElementById("scrollButton").style.display = "none";
    backButton.style.display = "block";
    if (localStorage.getItem("measurement") !== null) {
        const json = localStorage.getItem("measurement");
        canvas.loadFromJSON(JSON.parse(json), canvas.renderAll.bind(canvas), function (o, object) {
            object.set('selectable', false);
        })

    }
}

document.getElementById("zoom-in").addEventListener("click", function () {
    canvas.setZoom(canvas.getZoom() * 1.1);
});

document.getElementById("zoom-out").addEventListener("click", function () {
    canvas.setZoom(canvas.getZoom() / 1.1);
});

document.getElementById('zoomGoRight').addEventListener('click', function () {
    delta = new fabric.Point(units, 0);
    canvas.relativePan(delta);
});

document.getElementById('zoomGoLeft').addEventListener('click', function () {
    delta = new fabric.Point(-units, 0);
    canvas.relativePan(delta);
});

document.getElementById('zoomUp').addEventListener('click',function(){
    var units = 10 ;
    var delta = new fabric.Point(0,-units) ;
    canvas.relativePan(delta) ;
}) ;

document.getElementById('zoomDown').addEventListener('click',function(){
    var units = 10 ;
    var delta = new fabric.Point(0,units) ;
    canvas.relativePan(delta) ;
}) ;
const zoomReset=()=>{
    canvas.setViewportTransform([1,0,0,1,0,0]); 
}


const zoomFunction=()=>{
    if(showUPButtons.value==='off'){
        showUPButtons.style.display="none";
        showUPButtons.value="on"
        zoomControlButton.innerHTML=`<i class="fa fa-arrows-alt" aria-hidden="true"></i>`
        }
        else{
            showUPButtons.style.display="block"; 
            showUPButtons.value="off"
            zoomControlButton.innerHTML=`<i class="fa fa-times" aria-hidden="true"></i>`
        }
}