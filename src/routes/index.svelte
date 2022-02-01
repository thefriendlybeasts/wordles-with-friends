<script>
	import Guess from '../Guess.svelte';
	import { onMount } from 'svelte';

	let word = '';
	let activeGuess = 0;
	let guesses = [
		{ word: null },
		{ word: null },
		{ word: null },
		{ word: null },
		{ word: null },
		{ word: null }
	];

	/**
	 * Check if the guess is correct and respond accordingly.
	 * @param guessSubmittedEvent
	 */
	function checkGuess(guessSubmittedEvent) {
		const guess = guessSubmittedEvent.detail;
		guesses[activeGuess].word = guess;

		if (guess === word) {
			alert('You win!');
			return;
		}

		activeGuess++;
		if (activeGuess === guesses.length) {
			alert('you lose');
		}
	}

	onMount(() => {
		word = document.location.search.substring(6);
	});
</script>

<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3 p-5">
	{#each guesses as guess, i (i)}
		<Guess on:guess.submitted={checkGuess} disabled={i !== activeGuess} />
	{/each}
</div>
