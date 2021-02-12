let text,isWrite;
let saveMsg=document.getElementById("saveMsg");

let canvas = new fabric.Canvas('canvas');

if (localStorage.getItem("design") !== null) {
    const json = localStorage.getItem("design");
    canvas.loadFromJSON(JSON.parse(json),canvas.renderAll.bind(canvas), function (o, object) {
        object.set('selectable', false);
    });
}

function addText(){
canvas.on('mouse:down', function(e) {
    isWrite = true;
    if (e && e.target && e.target.left && e.target.top) {
        
        text = new fabric.Textbox('', {
            left: e.target.left,
            top: e.target.top,
            fontSize: 20,
            editable: true,
            selection: false,
            fill: 'black',
            width: 30,
            height: 40,
            textAlign: "center",
            hasControls: false,
            hasBorders: true,
            backgroundColor: 'yellow',
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,            
        });    
        canvas.add(text);
        text.enterEditing();

        
        // text.enterEditing();
        // canvas.setActiveObject(text);
        // // canvas.renderAll(); 

        // document.getElementById('input').addEventListener('keyup', function() {
        //     text.text = document.getElementById('input').value;
        //     canvas.renderAll();
        // });
          
    }
    canvas.on('mouse:up', function (o) {
        canvas.off('mouse:down');
    });
});
}
const storeData = () => {
    const json = canvas.toJSON();
    localStorage.setItem('measurement', JSON.stringify(json));
    saveMsg.style.display = "block";
    setTimeout(function(){ saveMsg.style.display = "none"; }, 1000)
}

// if (localStorage.getItem("measurement") !== null) {
//     const json = localStorage.getItem("measurement");
//     data = canvas.loadFromJSON(JSON.parse(json))
//     console.log(data);
//     localStorage.clear();

// }
