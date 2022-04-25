<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import NotificationService from '$lib/notification-service';
	import WordService from '$lib/word-service';

	const notificationService = new NotificationService();
	const wordService = new WordService();

	onMount(async () => {
		const solution = $page.params.puzzle;
		await wordService
			.validateWord(solution)
			.then((wordIsValid) => {
				if (wordIsValid) {
					window.location.href = '/puzzle/' + window.btoa(solution);
				} else {
					notificationService.alertInvalidWordError();
				}
			})
			.catch(notificationService.alertUnknownError);
	});
</script>
