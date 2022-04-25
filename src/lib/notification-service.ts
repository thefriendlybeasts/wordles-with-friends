export default class NotificationService {
  alertInvalidWordError() {
		alert(`There's a problem with your word. Ensure it's 5 letters long and is a word.`);
	}

	alertUnknownError(response) {
		alert('There was an unknown error. If you know what it means, check the console.');
		console.dir(response);
	}
}
