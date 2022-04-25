<script>
	import { page } from '$app/stores';
	import Guess from '../../Guess.svelte';
	import NotificationService from '$lib/notification-service';
	import WordService from '$lib/word-service';
	import { solution, guesses } from '../../stores';
	import { onMount } from 'svelte';

	const notificationService = new NotificationService();
	const wordService = new WordService();

	let activeGuess = 0;

	/**
	 * Check if the guess is correct and respond accordingly.
	 * @param guessSubmittedEvent
	 */
	async function processGuess(guessSubmittedEvent) {
		const guess = guessSubmittedEvent.detail;

		if (guessIsCorrect(guess)) {
			updateGuesses(guess);
			alert('You win!');
		} else {
			await wordService
				.validateWord(guess.join(''))
				.then((wordIsValid) => {
					if (wordIsValid) {
						updateGuesses(guess);
						activeGuess++;
						if (activeGuess === $guesses.length) {
							alert('you lose');
						}
					} else {
						notificationService.alertInvalidWordError();
					}
				})
				.catch(notificationService.alertUnknownError);
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

	function updateGuesses(guess) {
		const guessMetadata = getGuessMetadata(guess);
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
