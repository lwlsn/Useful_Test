let numTriangles = 6;

let hideButton;
let isNotHidden = false;
let addSequencerButton; 

let sequencerElement;
let sequencerElement2; 
let moreSeqElementsShowing = [false, false, false, false];

let synth;
let synth2;
let seqNotesCmaj = ['C1', 'D1', 'E1', 'F1','G1', 'A1', 'B1', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];
let seqNotesCmin = ['C2', 'D2', 'Eb2', 'F2', 'G2', 'Ab2', 'Bb2', 'C3', 'D3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4', 'D4', 'Eb4', 'G4'];
let seqLength = 17;
let columnHighlight = 0;
let playIndex = 0;

let playButton;
let isPlaying = false; 
let currentstep = 0;

let synthType = "Tone.Synth()";
let synthButtons = []; 
let synthButtons2 = [];

let effectLabels = ["Reverb", "Delay", "Distortion", "Crush"];
let reverb, delay,cheby, crusher;
let reverb2, delay2, cheby2, crusher2;
let slider = [];
let slider2 = [];
let volumeSlider, volumeSlider2;

let mozImg, mozImgX, mozImgY; 
let mozImgAnimate = false;

function preload() {
  mozImg = loadImage("assets/MOZ.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  mozImgX =width/8;
  mozImgY =  height*(3/4);
  
  hideButton = createButton("Help");
  hideButton.mousePressed(toggleHide);
  hideButton.position(width-width/15, 20);
  hideButton.addClass('hide-button');
  addSequencerButton = createButton("+");
  addSequencerButton.addClass('track-button');
  addSequencerButton.mousePressed(toggleSeqShow); 
  addSequencerButton.position(width-width/14, height-height/10);

  sequencerElement = new Sequencer(width-width*(7/14), 10, seqLength, seqNotesCmaj.length);
  synth = new Tone.Synth().toDestination();
  synth2 = new Tone.AMSynth().toDestination();
  Tone.Transport.scheduleRepeat(playSequenceCmaj, '16n');
  Tone.Transport.start();

  playButton = createButton("Play");
  playButton.position(width/12,height/20)
  playButton.mousePressed(togglePlay);
  playButton.hide();
  playButton.addClass('play-button');

  sequencerElement2 = new Sequencer(width-width*(7/14), 430, seqLength, seqNotesCmaj.length);

  createSynthButtons();
  createSynth2Buttons();
  createEffectSliders();
  createEffectSliders2();
  createVolumeSlider();
  createVolumeSlider2();
  loadEffects();

  synth.chain(crusher, cheby, delay, reverb);
  synth2.chain(crusher2,cheby2, delay2, reverb2);

}

function draw() {
  background("#FFED00");



  if (mozImgAnimate) {
    mozImgX+=10; 
    mozImgY += random(-2, 2);
    if (mozImgX >width +50) {
      mozImgAnimate = false;
    } 
  }

  
  if (isNotHidden) {
    sequencerElement.display();
    sequencerElement2.display();
  }

  updateTexts();
  for (let i=0; i < effectLabels.length; i++) {
    slider[i].display();
  }
  updateEffects(); 


  // Highlight the current column
  fill(255, 255, 0, 50);
  noStroke();
  rect((columnHighlight % seqLength) * sequencerElement.w + sequencerElement.x, sequencerElement.y, sequencerElement.w, sequencerElement.h * sequencerElement.rows);
  rect((columnHighlight % seqLength) * sequencerElement2.w + sequencerElement2.x, sequencerElement2.y, sequencerElement2.w, sequencerElement2.h * sequencerElement2.rows);



  if (isNotHidden) {
    image(mozImg, mozImgX,mozImgY, 150, 150);
    stroke(0, 80);

    strokeWeight(2);
    line(0, sequencerElement.h*sequencerElement.rows+20, width, sequencerElement.h*sequencerElement.rows+20 );
   
    if (moreSeqElementsShowing[0]) {
      stroke(0, 80);
      strokeWeight(2);
      line(0, 2*sequencerElement.h*sequencerElement.rows+40, width, 2*sequencerElement.h*sequencerElement.rows+40 );
      for (let i = 0; i < 6; i++) { // to-do: using hard coded numbers here
        synthButtons2[i].show();
      }
      for (let i=0; i < effectLabels.length; i++) {
        slider2[i].display();
      }
      volumeSlider2.display();
      updateTexts2();
    }
   


    zigzag(25);
    volumeSlider.display();


    
  }

  else {
    zigzag(width*(8/12));
   
    
  }


}

function mouseDragged() {
  for (let i=0; i < effectLabels.length; i++) {
    slider[i].update();
    slider2[i].update();
  }
  volumeSlider.update();
  volumeSlider2.update();
}

function mousePressed() {
  sequencerElement.toggleSquare();
  sequencerElement2.toggleSquare();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}