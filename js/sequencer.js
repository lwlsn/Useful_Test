
class Sequencer {
    constructor(x, y, cols, rows) {
      this.x = x;
      this.y = y;
      this.cols = cols;
      this.rows = rows;
      this.w = 600 / cols;
      this.h = 400 / rows;
      this.grid = [];
      for (let i = 0; i < rows; i++) {
        this.grid[i] = [];
        for (let j = 0; j < cols; j++) {
          this.grid[i][j] = false;
        }
      }
      this.isVisible = false;
    }
  
    display() {
  
        if (!this.isVisible) {
          return;
        }
        push();
        translate(this.x, this.y);
    
        for (let i=0; i< this.rows; i++) {
          if (this.grid[0][i]) {
            fill(255);
          }
          stroke(255);
          rect(this.w, i*this.h, this.w, this.h);
        }
    
        for (let i = 0; i < this.rows; i++) {
          for (let j = 1; j < this.cols; j++) {
            if (this.grid[i][j]) {
              fill(0,220, 0);
            } else {
                
              fill(200);
            }
            stroke(150);
            strokeWeight(1);
            rect(j * this.w, i * this.h, this.w, this.h);
          }
        }
        pop();
    }
  
    toggleSquare() {
      let j = floor((mouseX - this.x) / this.w);
      let i = floor((mouseY - this.y) / this.h);
  
      // Allow only one selected item per column
      if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
        for (let k = 0; k < this.rows; k++) {
          if (k !== i) {
            this.grid[k][j] = false;
          }
        }
        this.grid[i][j] = !this.grid[i][j];
      }
    }

    toggleDisplay() {
      this.isVisible = true;
    }
  }
  
function playSequenceCmaj(time) {
    let seqColumn = sequencerElement.grid.map(row => row[playIndex]);
    for (let i = 0; i < seqNotesCmaj.length; i++) {
      if (seqColumn[i]) {
        synth.triggerAttackRelease(seqNotesCmaj[i], '16n', time);
      }
    }
    playIndex = (playIndex + 1) % seqLength;
    columnHighlight = (columnHighlight + 1) % (seqLength * 4);
}

function playSequenceCmin(time) {
  let seqColumn = sequencerElement.grid.map(row => row[playIndex]);
  for (let i = 0; i < seqNotesCmaj.length; i++) {
    if (seqColumn[i]) {
      synth.triggerAttackRelease(seqNotesCmin[i], '16n', time);
    }
  }
  playIndex = (playIndex + 1) % seqLength;
  columnHighlight = (columnHighlight + 1) % (seqLength * 4);
}

function togglePlay() {
    if (isPlaying) {
      Tone.Transport.pause();
      isPlaying = false;
      playButton.html("Play");
    } else {
      Tone.Transport.start();
      isPlaying = true;
      playButton.html("Stop");
    }
  }