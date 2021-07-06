import {
  Lock,
  LockInfo,
  LockManager,
  LockManagerSnapshot,
  LocksInfo,
} from "./polyfill";

const locks = (function () {
  if (typeof window === "undefined") {
    return {
      request: async () => {},
      query: () => ({
        held: [],
        pending: [],
      }),
    } as Partial<LockManager>;
  }
  const navigator = window?.navigator as Navigator & { locks: LockManager };
  if (!navigator?.locks) {
    const lockManager = new LockManager();
    Object.defineProperty(navigator, "locks", {
      value: lockManager,
    });
  }
  return navigator?.locks;
})();

export {
  LockManager,
  locks as default,
  LockInfo,
  LocksInfo,
  Lock,
  LockManagerSnapshot,
};
