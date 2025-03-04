import { LockManager } from "../src/polyfill";

export * from "../src/polyfill";

let mockFridge: { [P: string]: any } = {};

export function beforeEachHandle() {
  beforeEach(() => {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockFridge[key] = value;
    });
    global.Storage.prototype.getItem = jest.fn((key) => mockFridge[key]);
  });
}

export function createWebLocksInstance() {
  const webLocks = new LockManager();
  window.localStorage.removeItem("heldLockSet");
  return webLocks;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const neverSettledPromise = new Promise((resolve) => {
  /* never */
});
