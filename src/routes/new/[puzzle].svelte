<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import WordService from '$lib/word-service';

	const wordService = new WordService();

	async function validateWord(solution) {
		if (solution.length !== 5) {
			alertInvalidWordError();
			return;
		}

		const response = await wordService.lookUpWord(solution);

		let wordIsValid;
		switch (response.status) {
			case 200:
				wordIsValid = true;
				break;
			case 404:
				alertInvalidWordError();
				wordIsValid = false;
				break;
			default:
				alertUnknownError(response);
				wordIsValid = false;
		}

		return wordIsValid;
	}

	function alertInvalidWordError() {
		alert(`There's a problem with your word. Ensure it's 5 letters long and is a word.`);
	}

	function alertUnknownError(response) {
		alert('There was an unknown error. If you know what it means, check the console.');
		console.dir(response);
	}

	onMount(async () => {
		const solution = $page.params.puzzle;
		await validateWord(solution).then((wordIsValid) => {
			if (wordIsValid) {
				window.location.href = '/puzzle/' + window.btoa(solution);
			}
		});
	});
</script>
