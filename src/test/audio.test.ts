import { describe, it, expect } from 'vitest';
import { MechanicalAudioSynth } from '../components/sound/MechanicalAudio';

describe('Mechanical Audio Synth', () => {
  it('toggles mute status and persists state', () => {
    const synth = new MechanicalAudioSynth();
    const isMuted = synth.toggleMute();
    expect(isMuted).toBe(true);
    expect(synth.toggleMute()).toBe(false);
  });
});