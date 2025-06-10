import XO from "/src/XO"
export default function Game(){

    let count = 0 ;
    function mark(event){
            // target img inside btn
            const img = event.currentTarget.querySelector("img");
            // console.log(img)

            if(img.getAttribute("src") == " "){
                // select the clicked button
                if(document.getElementsByTagName("h3")[0].classList.contains("turn") ){
                    // display X
                    img.setAttribute("src", "./images/X.png");
                    
                    // mark with X
                    event.target.classList.add("X");
                    
                    // switch turns
                    document.getElementsByTagName("h3")[0].classList.toggle("turn");
                    document.getElementsByTagName("h3")[1].classList.toggle("turn");
            }else{
                // display O
                img.setAttribute("src", "./images/O.png");

                // mark with O
                event.target.classList.add("O");

                // switch turns
                document.getElementsByTagName("h3")[0].classList.toggle("turn");
                document.getElementsByTagName("h3")[1].classList.toggle("turn");
            }
            count++;
            // start testing winner only after 5 turns
            if (count >= 5 && testingWinner() == "X") {
                    document.getElementById("w").style.cssText = "transform : scale(1.3) ;color : green ; transition : transform 0.3 ease "
                    document.getElementById("l").style.cssText = "transform : scale(0.7) ;color : red ; transition : transform 0.3 ease "
                    document.getElementById("clear").style.visibility = "visible";

                }else if(testingWinner() == "O" && count >= 5){
                    document.getElementById("w").style.cssText = "transform : scale(1.3) ;color : red ; transition : transform 0.3 ease " 
                    document.getElementById("l").style.cssText = "transform : scale(0.7) ;color : green ; transition : transform 0.3 ease "
                    document.getElementById("clear").style.visibility = "visible";

                }else if(count == 9 && testingWinner() == null){
                    document.getElementById("l").innerHTML = "Draw";
                    document.getElementById("w").innerHTML = "Draw";
                    document.querySelectorAll(".mainContainer h1").forEach(el => {
                        el.style.color = "gray"; 
                    });

                    document.getElementById("clear").style.visibility = "visible";
                }
            }  
    }
        // finding 3 align shapes (X or O)
        function testingWinner(){
            
            const winningCombos = [
                [0, 1, 2], 
                [3, 4, 5], 
                [6, 7, 8], 
                [0, 3, 6], 
                [1, 4, 7], 
                [2, 5, 8], 
                [0, 4, 8], 
                [2, 4, 6]  
            ];
            
            const btns = document.getElementsByClassName("field");   
                for(let j = 0; j < 8 ;j++){
                    let combo = winningCombos[j];
                    
                        if(btns[combo[0]].classList.contains("X") && btns[combo[1]].classList.contains("X") && btns[combo[2]].classList.contains("X")){
                            return "X";
                        }
                    
                }
                
                for(let j = 0; j < 8 ;j++){
                        let combo = winningCombos[j];
                    
                        if(btns[combo[0]].classList.contains("O") && btns[combo[1]].classList.contains("O") && btns[combo[2]].classList.contains("O")){
                            return "O"
                        }
                    
                }
                return null
            
        }

        function clear(){
            location.reload();
        }
        

    return(
        <>
            <div className="mainContainer">
                <h1 id="w">Wins</h1>
                <main>
                    <div className="players">
                        <h3 className="p1 turn">1st Player</h3>
                        <h3 className="p2">2nd Player</h3>
                    </div>
                    <div className="area">
                        {
                            XO.map((xo)=>
                                <div className={xo.className} onClick={mark} key={xo.id} id={xo.id} ><img src=" " alt="" /></div> 
                            )
                        }
                    </div>    
                    <button onClick={clear} id="clear">Play Again <img src="./images/replay.png" alt="replay" /></button>
                </main>
                <h1 id="l">Lose</h1>
            </div>
        </>
    )
}