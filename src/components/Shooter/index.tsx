import { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { Circle } from 'react-konva'
import { useWindowContext } from '../Window'
import { useDocumentEventListener, useKeyDownEventListener } from '../../hooks/useDocumentEventListener'

interface ShootersProps {
    
}

interface ShooterCoordinates {
    x: number,
    y: number
}

enum MoveKey {
    Left = 'ArrowLeft',
    Right = 'ArrowRight',
    Up = 'ArrowUp',
    Down = 'ArrowDown'
}

export const Shooter = (props: PropsWithChildren<ShootersProps>) => {
    const windowContext = useWindowContext();

    const [coordinates, setCoordinates] = useState<ShooterCoordinates>({
        x: windowContext.width / 2,
        y: windowContext.height / 2
    });

    const moveVelocity = 10;

    const moveX = useCallback((type: 'left' | 'right') => setCoordinates(coords => ({
        x: type === 'left' ? coords.x - moveVelocity : coords.x + moveVelocity,
        y: coords.y
    })), [coordinates, setCoordinates])

    const moveY = useCallback((type: 'up' | 'down') => setCoordinates(coords => ({
        x: coords.x,
        y: type == 'up' ? coords.y - moveVelocity : coords.y + moveVelocity
    })), [coordinates, setCoordinates])

    useDocumentEventListener('keydown', evt => {
        switch (evt.key) {
            case MoveKey.Up:
                moveY('up')
                break
            case MoveKey.Down:
                moveY('down')
                break
            case MoveKey.Left:
                moveX('left')
                break
            case MoveKey.Right:
                moveX('right')
                break
        }
    })

    return (
        <Circle
            width={50}
            height={50}
            x={coordinates.x}
            y={coordinates.y}
            radius={10}
            stroke='black'
            strokeWidth={1}
        />
    )
}