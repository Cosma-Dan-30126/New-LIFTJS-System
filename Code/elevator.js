const totalFloors=7;

// Urmatoarea implementare pe care as face-o este sa creez un sistem de stari pentru a spune in ce stare se afla liftul. Ne ajuta la deschisul usilor
const States= {
    IDLE: 'IDLE',
    //MOVING: 'MOVING', //Miscare. O sa o folosim asta si pentru a putea sa spunem cand un lift este busy pentru a-l selecta pe celalalt, 
    DOORS_OPEN: 'OPENING',  //Tranzitie
    DOORS_CLOSING: 'CLOSING'  //Tranzitie
};


//Mai degraba creez un obiect nou pentru lifturi in care le da si pozitia, si starea
const lifts= {
    A:{pos: 1, state: States.IDLE, element: document.getElementById('lift_A')},
    B:{pos: 7, state: States.IDLE, element: document.getElementById('lift_B')}

}



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




function goToFloor(floor, liftId) {
    const lift_moving_time=2000;
    const doors_action_time=700;
    const liftElement = document.getElementById(`lift_${liftId}`);
    const lift = lifts[liftId]; // Luăm obiectul liftului pentru a-i schimba starea

    if (liftElement) {
        lift.state = States.DOORS_CLOSED; 
        updateDoors(liftId, false); 

        // Punem un mic delay pentru a lăsa ușile să se închidă vizual
        setTimeout(() => {
            const procent = (floor - 1) * (100 / totalFloors);
            liftElement.style.bottom = `${procent}%`;
            
            liftId === "A" ? posA = floor : posB = floor;
            lift.pos = floor; 

            console.log(`Liftul cu Id ${liftId} se mișcă către etajul ${floor}`);

        //Aici avem logica cand liftul ajunge la etajul destinatie
            setTimeout(() => {
                lift.state = States.DOORS_OPEN;
                updateDoors(liftId, true);

                // După ce se deschid, îl punem IDLE
                setTimeout(() => {
                    lift.state = States.IDLE;
                }, doors_action_time); 

            }, lift_moving_time);

        }, doors_action_time); 
    }
}

function updateDoors(id, open){
    const left= lifts[id].element.querySelector('.left_door');
    const right= lifts[id].element.querySelector('.right_door');
    left.style.transform= open ? 'translateX(-100%)' : 'translateX(0)';
    right.style.transform= open ? 'translateX(100%)' : 'translateX(0)';
}