<script>
	import GuessLetter from './GuessLetter.svelte';
	import { createEventDispatcher } from 'svelte';

	export let disabled = true;

	const dispatch = createEventDispatcher();
	let values = ['', '', '', '', ''];

	/**
	 * Record the guess and let the parent know.
	 * @param e
	 */
	function submitGuess(e) {
		const formData = new FormData(e.target);
		[...formData.entries()].forEach(([key, value]) => {
			values[key] = value;
		});

		dispatch('guess.submitted', values);
	}

	/**
	 * Auto-focus on the next input after entering a value.
	 * @param {Object} customEvent
	 */
	function handleInput(customEvent) {
		const input = customEvent.detail.target;
		const nextElement = input.nextElementSibling;

		if (input.value.length && nextElement.tagName.toLowerCase() === 'input') {
			nextElement.focus();
		}
	}

	/**
	 * Delete the appropriate value and focus on the appropriate input.
	 * @param {Object} customEvent
	 */
	function handleBackspace(customEvent) {
		const input = customEvent.detail.target;
		const previousElement = input.previousElementSibling;
		const previousElementIsInput = previousElement?.tagName.toLowerCase() === 'input';

		if (input.value.length) {
			input.value = '';
			if (previousElementIsInput) {
				previousElement.focus();
			}
		} else if (previousElementIsInput) {
			previousElement.value = '';
			previousElement.focus();
		}
	}
</script>

<form class="flex space-x-3" on:submit|preventDefault={submitGuess}>
	{#each values as value, i (i)}
		<GuessLetter
			name={i}
			{value}
			{disabled}
			autofocus={!disabled && i === 0}
			on:input={handleInput}
			on:backspace={handleBackspace}
		/>
	{/each}

	<button class="bg-indigo-700 rounded">Submit guess</button>
</form>
