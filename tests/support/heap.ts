import { setFlagsFromString } from 'node:v8';
import { runInNewContext } from 'node:vm';

// `gc()` without starting the test process with --expose-gc: a context made after the flag is set has it.
setFlagsFromString('--expose-gc');
const gc = runInNewContext('gc') as () => void;

/** The bytes the heap holds once garbage is collected: what something keeps, measured before and after it runs. */
export function heapUsed(): number {
  gc();
  gc();
  return process.memoryUsage().heapUsed;
}
