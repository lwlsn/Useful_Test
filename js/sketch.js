let numTriangles = 6;

let hideButton;
let isHidden = false;
let addSequencerButton; 

let sequencerElement;
let sequencerElement2; 

let synth;
let synth2;
let seqNotesCmaj = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6'];
let seqNotesCmin = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5', 'D5', 'Eb5', 'F5', 'G5', 'Ab5', 'Bb5', 'C6', 'D6', 'Eb6'];
let seqLength = 17;
let columnHighlight = 0;
let playIndex = 0;

let playButton;
let isPlaying = false; 
let currentstep = 0;

let synthType = "Tone.Synth()";
let synthButtons = []; 

let effectLabels = ["Reverb", "Delay", "Distortion"];
let reverb, delay,cheby;
let slider = [];
let volumeSlider;

let mozImg; 

function preload() {
  mozImg = loadImage("assets/MOZ.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  hideButton = createButton("Help");
  hideButton.mousePressed(toggleHide);
  hideButton.position(width-width/13, 50);
  hideButton.addClass('hide-button');
  addSequencerButton = createButton("+");
  addSequencerButton.addClass('track-button');
  addSequencerButton.mousePressed(toggleSeqShow); 
  addSequencerButton.position(width-width/14, height-height/10);

  sequencerElement = new Sequencer(width-width*(7/14), 10, seqLength, seqNotesCmaj.length);
  sequencerElement2 = new Sequencer(width-width*(7/14), 425, seqLength, seqNotesCmaj.length);
  synth = new Tone.Synth().toDestination();
  synth2 = new Tone.Synth().toDestination();
  Tone.Transport.scheduleRepeat(playSequenceCmaj, '16n');
  Tone.Transport.start();

  playButton = createButton("Play");
  playButton.position(width/12,height/20)
  playButton.mousePressed(togglePlay);
  playButton.hide();
  playButton.addClass('play-button');

  createSynthButtons();
  createVolumeSlider();
  createEffectSliders();
  loadEffects();

  synth.chain(cheby, delay, reverb);

}

function draw() {
  background(255, 255,0);

  
  if (isHidden) {
    sequencerElement.display();
    sequencerElement2.display();
  }

  updateTexts();
  for (let i=0; i < effectLabels.length; i++) {
    slider[i].display();
    slider[i].update();
  }
  updateEffects(); 


  // Highlight the current column
  fill(255, 255, 0, 50);
  noStroke();
  rect((columnHighlight % seqLength) * sequencerElement.w + sequencerElement.x, sequencerElement.y, sequencerElement.w, sequencerElement.h * sequencerElement.rows);
  rect((columnHighlight % seqLength) * sequencerElement2.w + sequencerElement2.x, sequencerElement2.y, sequencerElement2.w, sequencerElement2.h * sequencerElement2.rows);

  // if(isHidden) {
 
    
  // } 

  if (isHidden) {
    image(mozImg, width/8, height*(3/4), 150, 150);
    stroke(0, 80);

  strokeWeight(2);
  line(0, sequencerElement.h*sequencerElement.rows+20, width, sequencerElement.h*sequencerElement.rows+20 );

    zigzag(25);
  }

  else {
    zigzag(width*(7/12));
  }




}

function mousePressed() {
  sequencerElement.toggleSquare();
  sequencerElement2.toggleSquare();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}