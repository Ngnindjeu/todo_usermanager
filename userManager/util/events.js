"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventTypes = {
    /**
     * EVENT_* used for emitting an event
     */
    EVENT_UPDATE_STATE: 'EVENT_UPDATE_STATE',
    EVENT_LOCK_USER: 'EVENT_LOCK_USER',
    EVENT_UNLOCK_USER: 'EVENT_UNLOCK_USER',
    /**
     * LISTEN_* used for listening (with .on()) for an action
     */
    LISTEN_USER_EDITING: 'LISTEN_USER_EDITING',
    LISTEN_USER_EDITED: 'LISTEN_USER_EDITED',
    LISTEN_REQUEST_LIST_UPDATE: 'LISTEN_REQUEST_LIST_UPDATE',
};
exports.default = eventTypes;
//# sourceMappingURL=events.js.map