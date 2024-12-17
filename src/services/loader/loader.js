import { Subject } from 'rxjs';

const loaderSubject = new Subject();

// enable subscribing to loader observable
const onLoading = (show = false) => {
    return loaderSubject.asObservable();
}

// convenience methods
const show = () => {
    loader(true);
}

const hide = () => {
    loader(false);
}

// core loader method
const loader = (isLoading) => {
    loaderSubject.next(isLoading);
}

export const loaderService = {
    show,
    hide,
    onLoading
};

