function moveLift(floor){
    let liftA= document.getElementById('lift_A');
    let liftB= document.getElementById('lift_B');
    const floorSize= 80;

    let posA= parseInt(liftA.style.bottom)|| 0;
    let posB= parseInt(liftB.style.bottom)|| 0;
    let target= (floor)*floorSize;

    if(Math.abs(target-posA)<=Math.abs(target-posB)){
        liftA.style.bottom = target + "px";
    } else{
        liftB.style.bottom = target+ "px";
    }
    
}