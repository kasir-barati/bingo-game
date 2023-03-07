import { PropsWithChildren, useEffect, useState } from 'react';
import './App.css';
import { cards } from './cards';

function App() {
    const { width } = useWindowDimensions();
    return (
        <div
            className="container text-center"
            style={{ maxWidth: '800px' }}
        >
            <div className="row ">
                {cards.map((card, index) => (
                    <div
                        className="col-2 m-1 rounded bg-light position-relative"
                        style={{
                            height: width < 200 ? '90px' : '80px',
                        }}
                    >
                        <button className="btn btn-secondary w-100 h-100 pt-3">
                            {card}
                            <Exclude condition={width < 330}>
                                <span className="badge bg-danger rounded-pill position-absolute end-0 start-0 px-2">
                                    {index + 1}
                                </span>
                            </Exclude>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

function Exclude({
    condition,
    children,
}: PropsWithChildren<{ condition: boolean }>) {
    return condition ? <></> : <>{children}</>;
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions(),
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () =>
            window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
