export const NOTIFICATION = "notification/NOTIFICATION";

export const types = {
    NOTIFICATION_SET_SHOW: `${NOTIFICATION}_SET_SHOW`,
    NOTIFICATION_SET_HIDE: `${NOTIFICATION}_SET_HIDE`,
};

export const INITIAL_STATE = {
    open: false,
    level: 'info',
    title: '',
    body: '',
    onCloseLabel: undefined,
    onClickLabel: 'Entendido',
    onClick: undefined,
    onClose: undefined,
    elemento:undefined
};

export const actions = {
    showNotification: (content) => ({
        type: types.NOTIFICATION_SET_SHOW,
        content,
    }),
    hideNotification: (open) => ({
        type: types.NOTIFICATION_SET_HIDE,
        open
    }),
};

export const selectors = {
    isOpen: ({ notification }) => notification.open,
    getOnClickLabel: ({ notification }) => notification.onClickLabel,
    getOnCloseLabel: ({ notification }) => notification.onCloseLabel,
    getLevel: ({ notification }) => notification.level,
    getTitle: ({ notification }) => notification.title,
    getBody: ({ notification }) => notification.body,
    onClose: ({ notification }) => notification.onClose,
    onClick: ({ notification }) => notification.onClick,
    elemento: ({ notification }) => notification.elemento,
};

const reducer =(state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.NOTIFICATION_SET_SHOW:
            return {
                ...state,
                open: true,
                level: action.content.level,
                title: action.content.title,
                body: action.content.body,
                onCloseLabel: action.content.onCloseLabel ? action.content.onCloseLabel : state.onCloseLabel,
                onClickLabel: action.content.onClickLabel ? action.content.onClickLabel : state.onClickLabel,
                onClick: action.content.onClick ? action.content.onClick : state.onClick,
                onClose: action.content.onClose ? action.content.onClose : state.onClose,
                elemento:action.content.elemento ? action.content.elemento : state.elemento
            };
        case types.NOTIFICATION_SET_HIDE:
            return {
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};
export default reducer;