'use strict';

import { save, load } from 'settings';

export function init() {
	load('recentcards', $('#recentcards'));

	$('#save').on('click', () => {
		save('recentcards', $('#recentcards'));
	});
}
