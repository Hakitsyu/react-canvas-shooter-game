import { PropsWithChildren, createContext, createRef, useContext, useRef } from 'react';
import { Stage } from 'react-konva';

export const Window = (props: PropsWithChildren) => {
    const context = useWindowContext();

    return (
        <Stage 
            width={context.width}
            height={context.height}
        >
            {props.children}
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