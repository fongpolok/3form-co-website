// Build-step logger. Same shape as the app's runtime loggers so build output
// and browser console output read alike: [3form][prerender] <message>.

const PREFIX = "[3form][prerender]";

/** Set PRERENDER_VERBOSE=1 to see one line per generated file. */
const verbose = process.env.PRERENDER_VERBOSE === "1";

export const log = {
  info: (...args) => console.log(PREFIX, ...args),
  /** Per-file detail — quiet unless PRERENDER_VERBOSE=1, so CI logs stay short. */
  debug: (...args) => {
    if (verbose) console.log(PREFIX, ...args);
  },
  warn: (...args) => console.warn(PREFIX, "WARNING:", ...args),
  error: (...args) => console.error(PREFIX, "ERROR:", ...args),
};

/** Times a build phase and logs how long it took. */
export async function step(label, fn) {
  const started = Date.now();
  log.info(`${label}…`);
  const result = await fn();
  log.info(`${label} — done in ${Date.now() - started}ms`);
  return result;
}
