export class LatencyTracker {
  private samples: number[] = []
  record(ms: number) { this.samples.push(ms); if (this.samples.length > 500) this.samples.shift(); }
  getP99() { if (!this.samples.length) return 0; const s = [...this.samples].sort((a,b)=>a-b); return s[Math.floor(s.length*0.99)]; }
}