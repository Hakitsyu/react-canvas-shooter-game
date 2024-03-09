import { useCallback, useRef, useState } from 'react'

type UseRefStateResult<T> = [
    ref: React.MutableRefObject<T>,
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>
]

export const useRefState = <T>(initialValue: T): UseRefStateResult<T> => {
    const [state, _setState] = useState<T>(initialValue);

    const ref = useRef(state);

    const setState = useCallback((action: React.SetStateAction<T>) => {
        const value = typeof action === 'function'
            ? (action as ((prevState: T) => T))(state) : action as T;

        ref.current = value
        _setState(value)
    }, [state, _setState])

    return [ref, state, setState]
}