export default class NotificationService {
  alertInvalidWordError() {
		alert(`There's a problem with your word. Ensure it's 5 letters long and is a word according to our dictionary.`);
	}

	alertUnknownError(response) {
		alert('There was an unknown error. If you know what "check the console" means, do it.');
		console.dir(response);
	}
}
