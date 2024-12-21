import { PropsWithChildren, createContext, createRef, useContext, useRef } from 'react';
import { Stage } from "@pixi/react"

export const Window = (props: PropsWithChildren) => {
    const context = useWindowContext();

    console.log(context.width, context.height)

    return (
        <Stage
            width={context.width}
            height={context.height}
            options={{
                backgroundColor: 0xffffff,
            }}
            style={{
                // width: '100%',
                // height: '100%'
            }}
        >
            <WindowContext.Provider value={context}>
                {props.children}
            </WindowContext.Provider>
        </Stage>
    )
}

interface WindowContextType {
    width: number,
    height: number
}

export const WindowContext = createContext<WindowContextType | null>(null);

export const useWindowContext = (): WindowContextType => {
    const context = useContext(WindowContext);

    if (!context) {
        throw new Error('Invalid WindowContext')
    }
    
    return context;
}