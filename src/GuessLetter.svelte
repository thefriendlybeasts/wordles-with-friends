<script>
	import { createEventDispatcher } from 'svelte';

	export let value;
	export let disabled = true;
	export let autofocus = false;
	export let name;

	const dispatch = createEventDispatcher();

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

<input
	class="border border-zinc-50 bg-transparent w-1/5 p-1 text-center disabled:opacity-50"
	maxlength="1"
	bind:value
	{disabled}
	{autofocus}
	{name}
	on:input={handleInput}
	on:keydown={handleKeyDown}
	pattern="[a-zA-Z]"
/>
