
function zigzag(xVal) {

    fill(0);
    stroke(0, 255, 0);
    strokeWeight(2);
    
    for (let i=0; i < numTriangles; i++) {
      triangle(xVal, height*(i/numTriangles), xVal+80, height/(numTriangles*2) +height*(i/numTriangles), xVal,  height*(i/numTriangles)+ height/numTriangles);
      
    }
    
    noStroke();
    rect(0, 0, xVal+2, height);
    
    fill("#FFED00");
  
    if (!isNotHidden) {
       
        textSize(32);
        text("Useful Tools: Moz", xVal-xVal*(2/3)+10, 100);

        text("Bis re num, et debis et ra dolesciam, tem as plique veremporem sus ditas alitatis eliam que volupta autatatus.", xVal-xVal*(2/3)+10,200, 500, 400);

       image(mozImg, xVal - xVal*(2/3), 400, 300, 300);
    }
   
    
  }
  