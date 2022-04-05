<script>
	import Guess from '../Guess.svelte';
	import { solution, guesses } from '../stores';
	import { onMount } from 'svelte';
	import WordService from '$lib/word-service';

	let activeGuess = 0;
	const wordService = new WordService();

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

	function alertInvalidWordError() {
		alert(`There's a problem with your word. Ensure it's 5 letters long and is a word.`);
	}

	function alertUnknownError(response) {
		alert('There was an unknown error. If you know what it means, check the console.');
		console.dir(response);
	}

	onMount(async () => {
		$solution = document.location.search.substring(6);
		if ($solution.length !== 5) {
			alertInvalidWordError();
			return;
		}

		const response = await wordService.lookUpWord($solution);

		switch (response.status) {
			case 200:
				// Do nothing?
				break;
			case 404:
				alertInvalidWordError();
				break;
			default:
				alertUnknownError(response);
		}
	});
</script>

<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3 p-5">
	{#each $guesses as guess, i (i)}
		<Guess on:guess.submitted={checkGuess} disabled={i !== activeGuess} {guess} />
	{/each}
</div>
