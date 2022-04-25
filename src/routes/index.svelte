<script>
	let puzzle = '';

	function redirectToNewPuzzlePage() {
		window.location.href = `/new/${puzzle}`;
	}
</script>

<div class="text-center space-y-4">
	<h1>Better UI coming soon</h1>
	<p>…maybe.</p>
	<img
		src="https://i0.wp.com/www.bapl.org/wp-content/uploads/2019/02/old-under-construction-gif.gif?ssl=1"
		alt="GeoCities-style under construction gif"
		class="mx-auto block"
	/>

	<p class="bg-red-300 text-red-800 p-2 rounded-sm">
		This doesn't work on mobile because of a bug with a dependency.
	</p>

	<form on:submit|preventDefault={redirectToNewPuzzlePage}>
		<input type="text" bind:value={puzzle} class="p-2" />
		<button type="submit" class="bg-indigo-700 rounded p-2">Create puzzle</button>
	</form>
</div>
