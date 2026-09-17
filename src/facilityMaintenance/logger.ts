// Same console convention as App.tsx's `log`, scoped to this module.
const PREFIX = "[3form][facility-maintenance]";

export const facilityLog = {
  info:  (...a: unknown[]) => console.log(PREFIX, ...a),
  event: (...a: unknown[]) => console.log(`${PREFIX}[event]`, ...a),
  warn:  (...a: unknown[]) => console.warn(PREFIX, ...a),
};
