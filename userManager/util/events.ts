const eventTypes = {
	/**
	 * EVENT_* used for emitting an event
	 */
	EVENT_UPDATE_STATE: 'EVENT_UPDATE_STATE',

	/**
	 * LISTEN_* used for listening (with .on()) for an action
	 */
	LISTEN_USER_DELETED: 'LISTEN_USER_DELETED',
	LISTEN_USER_EDITED: 'LISTEN_USER_EDITED',
}

export default eventTypes