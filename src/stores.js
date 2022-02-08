import { writable } from "svelte/store";

/**
 * The solution chosen by the puzzle creator.
 */
export const solution = writable('');

/**
 * Guesses are arrays of objects containing the letter, whether the position is correct, and
 * whether the letter is in the solution. Here's what a single letter looks like:
 *
 * {
 *  letter: '',
 *  positionIsCorrect: false,
 *  presence: false,
 * }
 */
export const guesses = writable([[], [], [], [], [], []]);
