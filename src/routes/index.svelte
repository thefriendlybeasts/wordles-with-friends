<script>
	import Guess from '../Guess.svelte';
	import { solution, guesses } from '../stores';
	import { onMount } from 'svelte';

	let activeGuess = 0;

	/**
	 * Check if the guess is correct and respond accordingly.
	 * @param guessSubmittedEvent
	 */
	function checkGuess(guessSubmittedEvent) {
		let solutionLetterPool = $solution;

		const guess = guessSubmittedEvent.detail;
		const guessMap = guess.map((letter, index) => {
			const letterMetaData = {
				letter,
				positionIsCorrect: $solution[index] === letter,
				presenceInSolution: $solution.includes(letter),
				presenceInPool: solutionLetterPool.includes(letter)
			};

			if (letterMetaData.presenceInPool) {
				solutionLetterPool = solutionLetterPool.replace(letter, '');
			}

			return letterMetaData;
		});

		if (activeGuess === 0) {
			$guesses = [guessMap, ...$guesses.slice(1)];
		} else {
			$guesses = [...$guesses.slice(0, activeGuess), guessMap, ...$guesses.slice(activeGuess + 1)];
		}

		const guessAsString = guess.join('');
		if (guessAsString === $solution) {
			alert('You win!');
			return;
		}

		activeGuess++;
		if (activeGuess === $guesses.length) {
			alert('you lose');
		}
	}

	onMount(() => {
		$solution = document.location.search.substring(6);
	});
</script>

<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3 p-5">
	{#each $guesses as guess, i (i)}
		<Guess on:guess.submitted={checkGuess} disabled={i !== activeGuess} />
	{/each}
</div>
