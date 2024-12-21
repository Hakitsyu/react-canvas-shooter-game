import { useCallback, useEffect, useInsertionEffect, useRef, useState } from 'react';
import { useWindowContext } from '../Window';
import { Graphics } from '@pixi/react';
import { Graphics as PixiGraphics } from '@pixi/graphics'
import { useDocumentEventListener } from '../../hooks/useDocumentEventListener';
import { useSpring, animated } from '@react-spring/web';

type Moves = 'up' | 'down' | 'left' | 'right';

const MovesKeys: {
    [key: string]: Moves
} = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down'
};

const AnimatedGraphics = animated(Graphics);

export const Shooter = () => {
    const windowContext = useWindowContext();

    const draw = useCallback((graphics: PixiGraphics) => {
        console.log(graphics.x, graphics.y)
        graphics.clear();
        graphics.lineStyle(1, 0x000000);
        graphics.drawCircle(0, 0, 10);
    }, []);

    const moveXVelocity = 80;
    const moveYVelocity = 40;

    const [coords, api] = useSpring(() => ({
        x: windowContext.width / 2,
        y: windowContext.height / 2
    }));

    const move = useCallback(
        (move: Moves) => {
            api.start((_, state) => {
                const coords = state.get();

                const isHorizontalMove = move === 'left' || move === 'right';
                if (isHorizontalMove) {
                    const newX = coords.x + (moveXVelocity * (move === 'left' ? -1 : 1));

                    return { x: newX };
                }

                const newY = coords.y + (moveYVelocity * (move === 'up' ? -1 : 1));
            
                return { y: newY };
            });
        },
        [api]
    );

    useDocumentEventListener('keydown', evt => move(MovesKeys[evt.key]));

    return (
        <AnimatedGraphics 
            draw={draw} 
            x={coords.x}
            y={coords.y}
        />
    )
}