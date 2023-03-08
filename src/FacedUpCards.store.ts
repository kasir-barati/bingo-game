import { action, atom, ReadableAtom } from 'nanostores';
import { winScenarios } from './cards';

type FaceUpCardsStore = {
    states: {
        facedUpCards: ReadableAtom<number[]>;
        bingo: ReadableAtom<boolean | undefined>;
    };
    actions: {
        addNewCardNumber: (cardNumber: number) => void;
        removeCardNumber: (cardNumber: number) => void;
        updateBingo: (cardsNumber: readonly number[]) => void;
    };
};

// States
const bingo = atom<boolean | undefined>();
const facedUpCards = atom<number[]>([]);

// Actions
const addNewCardNumber = action(
    facedUpCards,
    'addNewCardNumber',
    (facedUpCards, cardNumber: number) => {
        let cards = facedUpCards.get();

        cards.push(cardNumber);
        // Because I will check by row and then by column to find out who won
        cards = cards.sort((a, b) => a - b);
        facedUpCards.set(cards);
    },
);
const removeCardNumber = action(
    facedUpCards,
    'removeCardNumber',
    (facedUpCards, cardNumber: number) => {
        let cards = facedUpCards.get();

        cards = cards.filter((card) => card !== cardNumber);
        facedUpCards.set(cards);
    },
);
const updateBingo = action(
    bingo,
    'updateBingo',
    (bingo, cardsNumber: readonly number[]) => {
        for (const winScenario of winScenarios) {
            const filteredCardsNumber = winScenario.filter(
                (element) => cardsNumber.includes(element),
            );

            if (filteredCardsNumber.length === 5) {
                bingo.set(true);
                return;
            }
        }
        bingo.set(false);
    },
);

export const FaceUpCardsStore: FaceUpCardsStore = {
    states: {
        facedUpCards,
        bingo,
    },
    actions: {
        addNewCardNumber,
        removeCardNumber,
        updateBingo,
    },
};
