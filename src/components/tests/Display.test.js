import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display'
import fetchShow from '../../api/fetchShow'

jest.mock('../../api/fetchShow')

const testShow = {
    image: null,
    name: 'Test Show',
    description: 'this is a test',
    seasons: [
        {
            id: 1,
            episodes: [],
            name: 'Season 1'
        },
        {
            id: 2,
            episodes: [],
            name: 'Season 2'
        }
    ]
}

test('Display renders without errors', () => {
    render(<Display />);
})

test('Fetch button fetches data', async () => {
    fetchShow.mockResolvedValueOnce(testShow)

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const show = await screen.queryByText(/this is a test/i);
    expect(show).toBeInTheDocument
})

test('Show displays number of options equal to seasons', async () => {
    fetchShow.mockResolvedValueOnce(testShow)

    render(<Display />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    const options = await screen.queryAllByRole('option');
    // One option is 'none', so options will be seasons + 1
    expect(options).toHaveLength(3)
})

test('displayFunc runs if present', async() => {
    fetchShow.mockResolvedValueOnce(testShow)
    const fakeDisplayFunc = jest.fn()

    render(<Display displayFunc={fakeDisplayFunc} />)
    const button = screen.getByRole('button');
    await userEvent.click(button);
    await expect(fakeDisplayFunc).toBeCalledTimes(1)
})




///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.