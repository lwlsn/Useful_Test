function changeSynthType(type) {
    if (type === "Synth") {
        synth = new Tone.Synth();
        synth.chain(cheby, delay, reverb);
      } else if (type === "AM Synth") {
        synth = new Tone.AMSynth(30, "square", "square");
        synth.chain(cheby, delay, reverb);
      } else if (type === "Duo Synth") {
        synth = new Tone.DuoSynth().toDestination();
        synth.chain(cheby, delay, reverb);
        synth.volume.value = -12; 
      } else if (type === "Pluck Synth") {
        synth = new Tone.PluckSynth().toDestination();
        synth.chain(cheby, delay, reverb);
      } else if (type ==  "FM Synth") {
        synth = new Tone.FMSynth().toDestination();
        synth.chain(cheby, delay, reverb);
      } else if (type = "Membrane Synth") {
        synth = new Tone.MembraneSynth().toDestination();
        synth.chain(cheby, delay, reverb);
        synth.volume.value = -12; 
      }
      synthType = type;
      console.log("Changed Synth Type to " + synthType);
}

function createSynthButtons() {
  let synthTypes = ["Synth", "AM Synth", "Duo Synth", "Pluck Synth", "FM Synth", "Membrane Synth" ];
  for (let i = 0; i < synthTypes.length; i++) {
    let type = synthTypes[i];
    // let button = createButton(type);
    synthButtons[i] = createButton(type);
    synthButtons[i].mousePressed(function() {changeSynthType(type)});  
  } 

  let buttonWidth = 120;
  let buttonHeight = 50;
  let xSpacing = 150;
  let xPadding = width * (14/ 40);
  let ySpacing = 60;
  let rectPadding = 25;

  for (let i = 0; i < synthTypes.length; i++) {
    let xPosition = sequencerElement.x - xPadding + (i % 2) * xSpacing;
    let yPosition = sequencerElement.h*(6/13) * sequencerElement.rows + Math.floor(i / 2) * ySpacing;
    synthButtons[i].position(xPosition, yPosition);
    synthButtons[i].size(buttonWidth, buttonHeight);
    synthButtons[i].addClass('synth-button');
    synthButtons[i].hide(); 
  }

  // Calculate the coordinates for the rectangle
  let rectX = sequencerElement.x - xPadding - rectPadding;
  let rectY = sequencerElement.h*(7/12) * sequencerElement.rows - rectPadding;
  let rectWidth = xSpacing * 2 + buttonWidth + 2 * rectPadding;
  let rectHeight = ySpacing * Math.ceil(synthTypes.length / 2) + buttonHeight + 2 * rectPadding;

  // Draw the rectangle with a black outline and no fill
  noFill();
  stroke(0);
  rect(rectX, rectY, rectWidth, rectHeight);

}


function loadEffects() {

  // Define Audio Effects
  reverb = new Tone.JCReverb(0.25).toDestination();
  delay = new Tone.FeedbackDelay(0.25);
  cheby = new Tone.Chebyshev(50);
  

}

function updateEffects() {

  reverb.wet.value = slider[0].returnVal();
  delay.wet.value = slider[1].returnVal();
  cheby.wet.value = slider[2].returnVal();

}