const totalFloors=7;

//Mai degraba creez un obiect nou pentru lifturi in care le da si pozitia, si starea
const lifts= {
    A:{pos: 1, state: States.IDLE, element: document.getElementById('lift_A')},
    B:{pos: 7, state: States.IDLE, element: document.getElementById('lift_B')}

}

// Urmatoarea implementare pe care as face-o este sa creez un sistem de stari pentru a spune in ce stare se afla liftul. Ne ajuta la deschisul usilor
const States= {
    IDLE: 'IDLE',
    MOVING: 'MOVING', //Miscare. O sa o folosim asta si pentru a putea sa spunem cand un lift este busy pentru a-l selecta pe celalalt, 
    DOORS_OPEN: 'OPENING',  //Tranzitie
    DOORS_CLOSING: 'CLOSING'  //Tranzitie
};


function moveLift(reqFloor){
    let availableLifts = [];

    for( let id in lifts){
        if(lifts[id].state=== States.IDLE){
            availableLifts.push(id); 
        }
    }

    if (availableLifts.length===0){
        console.log("Lifturile sunt ocupate, asteapta eliberarea unuia dintre ele!")
        return;
    }

    let chosenId;
    if(availableLifts.length==2){
        let distA = Math.abs(reqFloor - lifts.A.pos);
        let distB = Math.abs(reqFloor - lifts.B.pos);
        chosenId = (distA <= distB) ? "A" : "B";
    } else {
        chosenId=availableLifts[0];
    }
goToFloor(reqFloor,chosenId);

}


function goToFloor(floor,liftId){
    const procent= (floor-1)*(100/totalFloors);
    const liftElement= document.getElementById(`lift_${liftId}`);

    if (liftElement) {
        liftElement.style.bottom = `${procent}%`;
                liftId === "A" ? posA = floor : posB = floor;
    }

    liftId==="A" ? posA= floor : posB=floor;
    console.log(`Liftul cu Id ${liftId} se misca catre etajul selectat ${floor}`);



}