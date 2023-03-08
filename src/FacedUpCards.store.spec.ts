import { allTasks, cleanStores, keepMount } from 'nanostores';
import { FaceUpCardsStore } from './FacedUpCards.store';

describe('FaceUpCardsStore', () => {
    const { actions, states } = FaceUpCardsStore;

    afterEach(async () => {
        cleanStores(states.bingo, states.facedUpCards);
    });

    describe('addNewCardNumber', () => {
        it('should add 1 to the faced up cards', async () => {
            keepMount(states.facedUpCards);
            actions.addNewCardNumber(1);
            await allTasks();

            expect(states.facedUpCards.get()).toContain(1);
        });
    });

    describe('removeCardNumber', () => {
        it('should remove 1 from the faced up cards', async () => {
            console.log('HI');
            keepMount(states.facedUpCards);
            actions.addNewCardNumber(1);
            actions.removeCardNumber(1);
            await allTasks();

            expect(states.facedUpCards.get()).not.toContain(1);
        });
    });

    describe('updateBingo', () => {
        describe('should make bingo true', () => {
            it.each([
                [0, 1, 2, 3, 4],
                [0, 5, 10, 15, 20],
                [0, 6, 12, 18, 24],
            ])('Simple cases %d', async (...array) => {
                keepMount(states.bingo);
                keepMount(states.facedUpCards);
                for (const item of array) {
                    actions.addNewCardNumber(item);
                }
                await allTasks();

                actions.updateBingo(states.facedUpCards.get());
                expect(states.bingo.get()).toBeTruthy();
            });

            it.each([
                [16, 18, 8, 12, 20, 24, 4, 6],
                [4, 6, 8, 9, 12, 14, 16, 18, 19, 20, 24],
            ])('More complex cases %d', async (...array) => {
                keepMount(states.bingo);
                keepMount(states.facedUpCards);
                for (const item of array) {
                    let a = item;
                    actions.addNewCardNumber(item);
                }
                await allTasks();

                actions.updateBingo(states.facedUpCards.get());
                expect(states.bingo.get()).toBeTruthy();
            });
        });

        describe('should make bingo false', () => {
            it.each([
                [1, 2],
                [0, 1, 2, 3],
                [0, 5, 12, 18, 24],
                [7, 12],
                [2, 7, 12, 17],
            ])('Simple cases %d', async (...array) => {
                keepMount(states.bingo);
                keepMount(states.facedUpCards);
                for (const item of array) {
                    actions.addNewCardNumber(item);
                }
                await allTasks();

                actions.updateBingo(states.facedUpCards.get());
                expect(states.bingo.get()).toBeFalsy();
            });
        });
    });
});
