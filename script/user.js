let text;
let saveMsg=document.getElementById("saveMsg");

let canvas = new fabric.Canvas('c');

if (localStorage.getItem("design") !== null) {
    const json = localStorage.getItem("design");
    canvas.loadFromJSON(JSON.parse(json),canvas.renderAll.bind(canvas), function (o, object) {
        object.set('selectable', false);
    });
}

canvas.on('mouse:down', function(e) {
    if (e && e.target && e.target.left && e.target.top) {
        text = new fabric.Textbox('', {
            left: e.target.left,
            top: e.target.top,
            fontSize: 20,
            editable: true,
            // Selection: false,
            fill: 'black',
            width: 30,
            height: 40,
            textAlign: "center",
            hasControls: false,
            hasBorders: true,
            backgroundColor: 'yellow',
        });    
        canvas.add(text)
        text.enterEditing();
        canvas.setActiveObject(text);
        canvas.renderAll();
    }
});

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