let posA=1;
let posB=7;
const totalFloors=7;

function moveLift(reqFloor){
    let distA=Math.abs(reqFloor-posA);
    let distB=Math.abs(reqFloor-posB);

    //distA <= distB ? goToFloor(reqFloor, "A")
                 //  : goToFloor(reqFloor, "B")

    if(distA === distB) 
        {
            goToFloor(reqFloor, "A")
} else if(distA < distB)
{
    goToFloor(reqFloor, "A")
} else {
    goToFloor(reqFloor, "B")
}
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