function createEffectSliders() {
    for (let i=0; i <effectLabels.length; i++) {
      // slider[i]= createSlider(0, 1, 0.1, 0.01);
      // let ySpacing = 150;
      // let xPadding = width/15;
      // slider[i].position(sequencerElement.x - xPadding, sequencerElement.h/5*sequencerElement.rows +i*ySpacing);
      // slider[i].addClass('slider');
      // slider[i].hide();

      let ySpacing = 120;
      let xPadding = width*(1/8);
      slider[i] = new Potentiometer(sequencerElement.x - xPadding, sequencerElement.h/5*sequencerElement.rows +i*ySpacing, 50, effectLabels[i] );
    }

}

function createVolumeSlider() {
  volumeSlider = createSlider(-24, 0, -12, 1);
  let xPadding = width * (13/ 40);
  volumeSlider.position(sequencerElement.x - xPadding, sequencerElement.h/4*sequencerElement.rows); 
  volumeSlider.addClass('big-slider');
  volumeSlider.hide();

  // let pos = createVector(sequencerElement.x - xPadding, sequencerElement.h/4*sequencerElement.rows);
  // let sSize = createVector(50, 150);
  // let kSize = createVector( 60, 30);
  // volumeSlider = new CustomSlider(pos, sSize, kSize);

}

  
function updateTexts() {

  textSize(24);
    for (let i=0; i <effectLabels.length; i++) {
      fill(0);
      let yPadding = 20;
      let xPadding = width*(1/8);
      let ySpacing = 120;
      if (isHidden) {
        textSize(18);
        text(effectLabels[i],sequencerElement.x - xPadding,  sequencerElement.h/5*sequencerElement.rows +i*ySpacing - yPadding);
      }

    }
    let xPadding = width * (13/ 40);
    text("Volume", sequencerElement.x-xPadding,sequencerElement.h/5*sequencerElement.rows )
  
    synth.volume.value = volumeSlider.value(); 
}


function toggleHide() {
    isHidden = !isHidden;
    if (playButton.elt.style.display === 'none') {
      playButton.show();
    } else {
      playButton.hide();
    }

    for (let i=0; i < synthButtons.length; i++) {
      if (synthButtons[i].elt.style.display == 'none') {
        synthButtons[i].show();
      } else {
        synthButtons[i].hide();
      }
    }

    // for (let i=0; i< slider.length; i++) {
    //   if (slider[i].elt.style.display == 'none') {
    //     slider[i].show();
    //   } else {
    //     slider[i].hide();
    //   }
  
    // }

    // for (let i=0; i< slider.length; i++) {
    //   slider[i].toggleDisplay();
    // }
  
  

    if (volumeSlider.elt.style.display == 'none') {
      volumeSlider.show();
    } else {
      volumeSlider.hide();
    }

    sequencerElement.toggleDisplay();
    
}

  

function toggleSeqShow() {
  sequencerElement2.toggleDisplay(); 

}
  


class Potentiometer{
  constructor(x,y, diameter, text) {
    this.diameter= diameter;
    this.radius = diameter / 2;
    // this.knobLength = knobLength;
    this.angle=0;
    this.text = text;
    this.x=x+this.radius;
    this.y=y+this.radius;
  }
  
  update() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    if (mouseX > this.x-this.radius && mouseX < this.x+this.radius && mouseY < this.y + this.radius && mouseY > this.y-this.radius ) {
       this.angle = atan2(dy, dx);
    }  
  }
  
  
  display() {
    // Draw slider
    fill("#21130D");
    ellipse(this.x, this.y, this.diameter);
    
    // Draw knob
    stroke(255, 255,0);
    strokeWeight(2);
    
    let knobX = this.x+this.radius*cos(this.angle);
    let knobY = this.y+this.radius*sin(this.angle);
    line(this.x, this.y, knobX, knobY);
    // line(this.x, this.y, this.x-this.r, this.y);
    textSize(24);
    text(this.returnVal(),this.x, this.y + this.radius + 20);
    // text(this.text,this.x, this.y + this.radius - 80);
  }
  
  returnVal() {
    let outValue = map(this.angle, -PI, PI, 0, 1);
    textSize(24);
    fill(0);
    return(outValue.toFixed(2));

    
  }
  

}



class CustomSlider {
  constructor(pos, sliderSize, knobSize){
    this.x=pos.x; 
    this.y=pos.y;
    this.w =sliderSize.x;
    this.h = sliderSize.y;
    this.knobSizeX= knobSize.x;
    this.knobSizeY = knobSize.y;
    this.knobX = this.x;
    this.knobY = random(this.y-this.h/2, this.y+this.h/2)
  }
  
  display() {
    fill(0,200);  
    rectMode(CENTER);
    noStroke();
    rect(this.x, this.y, this.w, this.x,  20);
    
    fill(0, 220);
    rect(this.knobX, this.knobY, this.knobSizeX, this.knobSizeY, 10);
    rectMode(CORNER);
  }
  
  update() {

    if (mouseY < this.y+this.h/2 && mouseY > this.y-this.h/2) {
        this.knobY = mouseY;
    } else if (mouseY >= this.y+this.h/2) {
      this.knobY =  this.y+this.h/2;
    } else {
      this.knobY = this.y-this.h/2;
    }
  }
  
  returnVal() {
    let outValue = map(this.knobY,  this.y+this.h/2, this.y-this.h/2, 0, 1);
    textSize(18);
    fill(0);
    text(outValue.toFixed(2), this.x+30, this.y+this.h/2 +20);
    // console.log(outValue.toFixed(2));
    return(outValue.toFixed(2));
  }
}