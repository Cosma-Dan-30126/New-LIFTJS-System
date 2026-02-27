const totalFloors=7;

// Urmatoarea implementare pe care as face-o este sa creez un sistem de stari pentru a spune in ce stare se afla liftul. Ne ajuta la deschisul usilor
const States= {
    IDLE: 'IDLE',
    MOVING: 'MOVING', //Miscare. O sa o folosim asta si pentru a putea sa spunem cand un lift este busy pentru a-l selecta pe celalalt, 
    DOORS_OPEN: 'OPENING',  //Tranzitie
    DOORS_CLOSED: 'CLOSING'  //Tranzitie
};


//Mai degraba creez un obiect nou pentru lifturi in care le da si pozitia, si starea
const lifts= {
    A:{pos: 1, state: States.IDLE, element: document.getElementById('lift_A')},
    B:{pos: 7, state: States.IDLE, element: document.getElementById('lift_B')}

}

Object.keys(lifts).forEach(id => {
    updateDoors(id, true); // Deschide ușile vizual
    updatePanel(id);       // Actualizează afișajul
});

function updatePanel(liftId){
    const lift= lifts[liftId];
    const display= document.getElementById(`view_pannel_${liftId}`);
    const stateLabel= document.getElementById(`state-${liftId}`);

    if (display) display.innerText= lift.pos;
    if(stateLabel){
        stateLabel.innerText= lift.state;
        if(lift.state===States.IDLE) stateLabel.style.color="#2ecc71";
        else if(lift.state===States.MOVING) stateLabel.style.color="#f39c12";
        else stateLabel.style.color="#e74c3c"; 
    }
}
updatePanel('A');
updatePanel('B');


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
        updatePanel(liftId);
        // Punem un mic delay pentru a lăsa ușile să se închidă vizual
        setTimeout(() => {
            lift.state=States.MOVING;
            updatePanel(liftId)
            const procent = (floor - 1) * (100 / totalFloors);
            liftElement.style.bottom = `${procent}%`;
            lift.pos = floor; 
            updatePanel(liftId);

            console.log(`Liftul cu Id ${liftId} se mișcă către etajul ${floor}`);

        //Aici avem logica cand liftul ajunge la etajul destinatie
            setTimeout(() => {
                lift.state = States.DOORS_OPEN;
                updateDoors(liftId, true);
                updatePanel(liftId);

                // După ce se deschid, îl punem IDLE
                setTimeout(() => {
                    lift.state = States.IDLE;
                    updatePanel(liftId);
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

function pressInternal(floor,liftId){
    const lift = lifts[liftId];

    //Verific daca liftu e in IDLE
    if(lift.state !== States.IDLE)
    {
        console.warn(`Liftul ${liftId} este ocupat si in starea de: (${lift.state}).Asteptati eliberarea acestuia.`);
        return;
    }
    
    if(lift.pos===floor){
        console.log(`Liftul ${liftId} este deja la etajul cerut: ${floor}.`);
        return;
    }

    console.log(`Comanda acceptta: Lift ${liftId} catre etajul ${floor}`);
    goToFloor(floor,liftId);
}