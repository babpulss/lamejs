const lamejs = require('lamejs');
const fs = require('fs');

const wavData = fs.readFileSync('R_20230727-150432.wav');
const mp3Encoder = new lamejs.Mp3Encoder(1, 44100, 128); // Mono, 44.1 kHz sample rate, 128 kbps bitrate

const samples = new Int16Array(wavData.buffer); // Convert binary WAV data to Int16Array

const mp3Data = [];
const sampleBlockSize = 1152; // You can experiment with different values

for (let i = 0; i < samples.length; i += sampleBlockSize) {
  const sampleChunk = samples.subarray(i, i + sampleBlockSize);
  const mp3Chunk = mp3Encoder.encodeBuffer(sampleChunk);
  mp3Data.push(mp3Chunk);
}

// Flush the remaining MP3 data
const finalMp3Data = mp3Encoder.flush();
mp3Data.push(finalMp3Data);

const outputDataLength = mp3Data.reduce((totalLength, chunk) => totalLength + chunk.length, 0);
const outputData = new Uint8Array(outputDataLength);
let offset = 0;

for (const mp3Chunk of mp3Data) {
  outputData.set(mp3Chunk, offset);
  offset += mp3Chunk.length;
}

fs.writeFileSync('output.mp3', Buffer.from(outputData));
