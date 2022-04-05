<script>
	// TODO Ensure contrast passes a11y check.
	import { createEventDispatcher } from 'svelte';

	export let value;
	export let disabled = true;
	export let autofocus = false;
	export let name;
	export let letterGuess;

	const dispatch = createEventDispatcher();

	let guessColor = 'bg-transparent';
	$: {
		if (letterGuess && letterGuess.hasOwnProperty('positionIsCorrect')) {
			const { positionIsCorrect, presenceInSolution, presenceInPool } = letterGuess;
			if (presenceInSolution && presenceInPool) {
				guessColor = 'bg-yellow-600';
			}
			if (positionIsCorrect) {
				guessColor = 'bg-green-700';
			}
		}
	}

	/**
	 * Allow only alpha characters and notify parent of event.
	 * @param {Object} event
	 */
	function handleInput(event) {
		const { value } = event.target;
		if (value.match(/[^a-zA-Z]/)) {
			event.target.value = '';
		} else {
			dispatch('input', event);
		}
	}

	/**
	 * Notify parent of backspace keydown event.
	 * @param {Object} event
	 */
	function handleKeyDown(event) {
		if (event.key !== 'Backspace') {
			return;
		}

		event.preventDefault();
		dispatch('backspace', event);
	}
</script>

<!-- TODO Add labels, e.g. Guess 1, Letter 1; Guess 1, Letter 2 -->
<input
	class={`border border-zinc-50 w-1/5 p-1 text-center text-zinc-50 font-bold text-lg uppercase disabled:opacity-75 ${guessColor}`}
	maxlength="1"
	bind:value
	{disabled}
	{autofocus}
	{name}
	on:input={handleInput}
	on:keydown={handleKeyDown}
	pattern="[a-zA-Z]"
	required
/>
