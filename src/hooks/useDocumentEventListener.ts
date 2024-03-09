import { useEffect } from 'react'

interface DocumentEventMap extends GlobalEventHandlersEventMap {
    "DOMContentLoaded": Event;
    "fullscreenchange": Event;
    "fullscreenerror": Event;
    "pointerlockchange": Event;
    "pointerlockerror": Event;
    "readystatechange": Event;
    "visibilitychange": Event;
}

type UseDocumentEventListenerFunction<K extends keyof DocumentEventMap> = (this: Document, ev: DocumentEventMap[K]) => any

export const useDocumentEventListener = <K extends keyof DocumentEventMap>(type: K, fn: UseDocumentEventListenerFunction<K>, options?: boolean | AddEventListenerOptions) => {
    useEffect(() => {
        document.addEventListener(type, fn, options)

        return () => {
            document.removeEventListener(type, fn, options)
        }
    }, [])
}