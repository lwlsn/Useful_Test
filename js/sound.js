function changeSynthType(type) {
    if (type === "Synth") {
        synth = new Tone.Synth();
        synth.chain(crusher, cheby, delay, reverb);
      } else if (type === "AM Synth") {
        synth = new Tone.AMSynth(30, "square", "square");
        synth.chain(crusher,cheby, delay, reverb);
      } else if (type === "Duo Synth") {
        synth = new Tone.DuoSynth().toDestination();
        synth.chain(crusher,cheby, delay, reverb);
        synth.volume.value = -12; 
      } else if (type === "Pluck Synth") {
        synth = new Tone.PluckSynth().toDestination();
        synth.chain(crusher, cheby, delay, reverb);
      } else if (type ==  "FM Synth") {
        synth = new Tone.FMSynth().toDestination();
        synth.chain(crusher,cheby, delay, reverb);
      } else if (type = "Membrane Synth") {
        synth = new Tone.MembraneSynth().toDestination();
        synth.chain(crusher,cheby, delay, reverb);
        synth.volume.value = -12; 
      }
      synthType = type;
      console.log("Changed Synth Type to " + synthType);
}



function changeSynth2Type(type) {
  if (type === "Synth") {
      synth2 = new Tone.Synth();
      synth2.chain(crusher2, cheby2, delay2, reverb2);
    } else if (type === "AM Synth") {
      synth2 = new Tone.AMSynth(30, "square", "square");
      synth2.chain(crusher2, cheby2, delay2, reverb2);
    } else if (type === "Duo Synth") {
      synth2 = new Tone.DuoSynth().toDestination();
      synth2.chain(crusher2, cheby2, delay2, reverb2);
      synth2.volume.value = -12; 
    } else if (type === "Pluck Synth") {
      synth2 = new Tone.PluckSynth().toDestination();
      synth2.chain(crusher2,cheby2, delay2, reverb2);
    } else if (type ==  "FM Synth") {
      synth2 = new Tone.FMSynth().toDestination();
      synth2.chain(crusher2,cheby2, delay2, reverb2);
    } else if (type = "Membrane Synth") {
      synth2 = new Tone.MembraneSynth().toDestination();
      synth2.chain(crusher2, cheby2, delay2, reverb2);
      synth2.volume.value = -12; 
    }
    synthType2 = type;
    console.log("Changed Synth Type to " + synthType2);
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
    let xPosition = sequencerElement.x - xPadding + (i % 3) * xSpacing;
    let yPosition = sequencerElement.h*(9/13)* sequencerElement.rows + Math.floor(i / 3) * ySpacing;
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

function createSynth2Buttons() {
  let synthTypes = ["Synth", "AM Synth", "Duo Synth", "Pluck Synth", "FM Synth", "Membrane Synth" ];
  for (let i = 0; i < synthTypes.length; i++) {
    let type = synthTypes[i];
    // let button = createButton(type);
    synthButtons2[i] = createButton(type);
    synthButtons2[i].mousePressed(function() {changeSynth2Type(type)});  
  } 

  let buttonWidth = 120;
  let buttonHeight = 50;
  let xSpacing = 150;
  let xPadding = width * (14/ 40);
  let ySpacing = 60;

  for (let i = 0; i < synthTypes.length; i++) {
    let xPosition = sequencerElement2.x - xPadding + (i % 3) * xSpacing;
    let yPosition = 425+ sequencerElement2.h*(9/13)* sequencerElement2.rows + Math.floor(i / 3) * ySpacing;
    synthButtons2[i].position(xPosition, yPosition);
    synthButtons2[i].size(buttonWidth, buttonHeight);
    synthButtons2[i].addClass('synth-button');
    synthButtons2[i].hide(); 
  }
}






function loadEffects() {

  // Define Audio Effects
  reverb = new Tone.JCReverb(0.25).toDestination();
  delay = new Tone.FeedbackDelay(0.25);
  cheby = new Tone.Chebyshev(50);
  crusher =  new Tone.BitCrusher(8);

  reverb2 = new Tone.JCReverb(0.25).toDestination();
  delay2 = new Tone.FeedbackDelay(0.25);
  cheby2 = new Tone.Chebyshev(50);
  crusher2 = new Tone.BitCrusher(8);
  

}

function updateEffects() {

  reverb.wet.value = slider[0].returnVal();
  delay.wet.value = slider[1].returnVal();
  cheby.wet.value = slider[2].returnVal();
  crusher.wet.value = slider[3].returnVal();

  reverb2.wet.value = slider2[0].returnVal();
  delay2.wet.value = slider2[1].returnVal();
  cheby2.wet.value = slider2[2].returnVal();
  crusher2.wet.value = slider2[3].returnVal();

}