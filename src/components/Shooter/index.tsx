import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { Circle } from 'react-konva'
import { useWindowContext } from '../Window'
import { useDocumentEventListener } from '../../hooks/useDocumentEventListener'

enum MoveKey {
    Left = 'ArrowLeft',
    Right = 'ArrowRight',
    Up = 'ArrowUp',
    Down = 'ArrowDown'
}

type MoveHorizontalTypes = 'left' | 'right';

type MoveVerticalTypes = 'up' | 'down';

export const Shooter = () => {
    const windowContext = useWindowContext();

    const ref = useRef(null);

    const moveVelocity = 35;

    const isMovingX = useRef(false);
    const moveX = useCallback(
        (type: MoveHorizontalTypes) => {
            const currentRef = ref.current as any;
            if (currentRef && !isMovingX.current) {
                isMovingX.current = true;

                const newX = type === 'left'
                    ? currentRef.x() - moveVelocity
                    : currentRef.x() + moveVelocity;

                currentRef.to({
                    x: newX,
                    duration: 0.1,
                    onFinish: () => isMovingX.current = false
                });
            }
        },
        []
    );

    const isMovingY = useRef(false);
    const moveY = useCallback(
        (type: MoveVerticalTypes) => {
            const currentRef = ref.current as any;
            if (currentRef && !isMovingY.current) {
                isMovingY.current = true;

                const newY = type === 'up'
                    ? currentRef.y() - moveVelocity
                    : currentRef.y() + moveVelocity;

                currentRef.to({
                    y: newY,
                    duration: 0.1,
                    onFinish: () => isMovingY.current = false 
                });
            }
        },
        []
    );

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
            ref={ref}
            width={50}
            height={50}
            x={windowContext.width / 2}
            y={windowContext.height / 2}
            radius={10}
            stroke='black'
            strokeWidth={1}
        />
    )
}