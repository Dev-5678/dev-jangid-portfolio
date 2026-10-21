import { describe, it, expect } from 'vitest';
import { runSystemDiagnostics } from '../utils/diagnostics';

describe('Diagnostics Invariants', () => {
  it('returns optimal system status', () => {
    const diag = runSystemDiagnostics();
    expect(diag.status).toBe('OPTIMAL');
    expect(diag.systemsIndexed.length).toBe(4);
  });
});