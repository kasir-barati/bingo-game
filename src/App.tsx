import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { cards } from './cards';
import { FaceUpCardsStore } from './FacedUpCards.store';

function App() {
    const { actions, states } = FaceUpCardsStore;
    const { facedUpCards, bingo } = states;

    return (
        <div
            className="container text-center"
            style={{ maxWidth: '800px' }}
        >
            <div className="row ">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="col-2 m-1 rounded bg-light position-relative"
                        style={{ height: '80px' }}
                    >
                        <input
                            type="checkbox"
                            className="btn-check"
                            onClick={(event) => {
                                event.currentTarget.checked
                                    ? actions.addNewCardNumber(index)
                                    : actions.removeCardNumber(index);
                                actions.updateBingo(
                                    facedUpCards.get(),
                                );
                                if (bingo.get()) {
                                    toast(
                                        <>
                                            <img
                                                src="firework.gif"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </>,
                                    );
                                }
                            }}
                            id={`cardNumber${index}`}
                        />
                        <label
                            className="btn btn-outline-secondary w-100 h-100 pt-3 d-flex align-items-center"
                            htmlFor={`cardNumber${index}`}
                        >
                            {card}
                            <span className="badge bg-danger rounded-pill position-absolute end-0 start-0">
                                {index + 1}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
