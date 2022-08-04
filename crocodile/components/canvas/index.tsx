import React, {useEffect, useRef} from 'react';
import styles from './Canvas.module.scss'

export type PaintCoords = {
    x: number,
    y: number,
    dx: number,
    dy: number
}

type CanvasProps = {
    onPaint: (data: PaintCoords) => void;
    onInit: (ref: CanvasRenderingContext2D) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onPaint, onInit }) => {
    const rootRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (rootRef.current) {
            rootRef.current.width = 1000;
            rootRef.current.height = 600;
            const ctx = rootRef.current.getContext('2d');

            if (ctx) {
                onInit(ctx);
                ctx.lineCap = 'round';
                ctx.lineWidth = 8;
                ctx.strokeStyle = 'red';

                rootRef.current.addEventListener('mousemove', (e) => {
                    const x = e.offsetX;
                    const y = e.offsetY;
                    const dx = e.movementX;
                    const dy = e.movementY;

                    if (e.buttons > 0) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x - dx, y - dy);
                        ctx.stroke();
                        ctx.closePath();

                        onPaint({x, y, dy, dx});
                    }
                })
            }
        }
    }, [])

    return (
        <canvas ref={rootRef} className={styles.root}/>
    );
};

export default Canvas