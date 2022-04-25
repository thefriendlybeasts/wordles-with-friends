<script>
	import { page } from '$app/stores';
	import Guess from '../../Guess.svelte';
	import { solution, guesses } from '../../stores';
	import { onMount } from 'svelte';

	let activeGuess = 0;

	/**
	 * Check if the guess is correct and respond accordingly.
	 * @param guessSubmittedEvent
	 */
	function processGuess(guessSubmittedEvent) {
		const guess = guessSubmittedEvent.detail;

		const guessMetadata = getGuessMetadata(guess);
		updateGuesses(guessMetadata);

		if (guessIsCorrect(guess)) {
			alert('You win!');
		} else {
			activeGuess++;
			if (activeGuess === $guesses.length) {
				alert('you lose');
			}
		}
	}

	function getGuessMetadata(guess) {
		let solutionLetterPool = $solution;

		return guess.map((letter, index) => {
			const letterMetadata = {
				letter,
				positionIsCorrect: $solution[index] === letter,
				presenceInSolution: $solution.includes(letter),
				presenceInPool: solutionLetterPool.includes(letter)
			};

			if (letterMetadata.presenceInPool) {
				solutionLetterPool = solutionLetterPool.replace(letter, '');
			}

			return letterMetadata;
		});
	}

	function updateGuesses(guessMetadata) {
		if (activeGuess === 0) {
			$guesses = [guessMetadata, ...$guesses.slice(1)];
		} else {
			$guesses = [
				...$guesses.slice(0, activeGuess),
				guessMetadata,
				...$guesses.slice(activeGuess + 1)
			];
		}
	}

	function guessIsCorrect(guess) {
		return guess.join('') === $solution;
	}

	onMount(async () => {
		$solution = window.atob($page.params.puzzle);
	});
</script>

<div class="max-w-lg mx-auto sm:px-6 lg:px-8 space-y-3 p-5">
	{#each $guesses as guess, i (i)}
		<Guess on:guess.submitted={processGuess} disabled={i !== activeGuess} {guess} />
	{/each}
</div>
