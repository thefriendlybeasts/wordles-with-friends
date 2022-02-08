<script>
	import GuessLetter from './GuessLetter.svelte';
	import { createEventDispatcher } from 'svelte';

	export let disabled = true;

	const dispatch = createEventDispatcher();
	let values = [null, null, null, null, null];

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
</script>

<form class="flex space-x-3" on:submit|preventDefault={submitGuess}>
	{#each values as value, i (i)}
		<GuessLetter name={i} {value} {disabled} autofocus={!disabled && i === 0} />
	{/each}

	<button class="bg-indigo-700 rounded">Submit guess</button>
</form>
