import React from 'react';
import ReactDOM from 'react-dom';
import GameObject from '../GameObject';
import {render, cleanup} from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import {MovingDirection, Type, Visibility} from '../../../game-helpers/Enums';

afterEach(cleanup);

const objectCoords = [
    [200, 133, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]
];

describe('tests for correct platform rendering', () => {

    it('renders GameObject correctly', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GameObject objectCoords={objectCoords}/>, div);
    });

    it('sets the css attribute bottom correctly', () => {
        const {getByTestId} = render(<GameObject objectCoords={objectCoords}/>);
        expect(getByTestId('renderedGameObject').style.bottom).toBe(objectCoords[0][1] + 'px');
    });

    it('sets the css attribute left correctly', () => {
        const {getByTestId} = render(<GameObject objectCoords={objectCoords}/>);
        expect(getByTestId('renderedGameObject').style.left).toBe(objectCoords[0][0] + 'px');
    });

    it('sets the css attribute display to block', () => {
        const {getByTestId} = render(<GameObject objectCoords={objectCoords}/>);
        expect(getByTestId('renderedGameObject').style.display).toBe('block');
    });

    it('sets the css attribute display to none when platform visibility is set to INVISIBLE', () => {
        const {getByTestId} = render(<GameObject objectCoords={[[200, 133, Type.DISAPPEARING_PLATFORM, Visibility.INVISIBLE, MovingDirection.LEFT]]}/>);
        expect(getByTestId('renderedGameObject').style.display).toBe('none');
    });

    it('sets the class _doodle-platform_ correctly', () => {
        const {getByTestId} = render(<GameObject objectCoords={[[200, 133, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]]}/>);
        expect(getByTestId('renderedGameObject').className).toBe('doodle-platform');
    });

    it('sets the class _doodle-platform-broken_ correctly', () => {
        const {getByTestId} = render(<GameObject objectCoords={[[200, 133, Type.BROKEN_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]]}/>);
        expect(getByTestId('renderedGameObject').className).toBe('doodle-platform-broken');
    });

    it('sets the class _doodle-platform-broken-destroyed_ correctly', () => {
        const {getByTestId} = render(<GameObject objectCoords={[[200, 133, Type.BROKENDESTROYED_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]]}/>);
        expect(getByTestId('renderedGameObject').className).toBe('doodle-platform-broken-destroyed');
    });

    it('sets the class _moving-platform_ correctly', () => {
        const {getByTestId} = render(<GameObject objectCoords={[[200, 133, Type.LEFTRIGHTMOVING_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]]}/>);
        expect(getByTestId('renderedGameObject').className).toBe('moving-platform');
    });

    it('sets the class _disappearing-platform_ correctly', () => {
        const {getByTestId} = render(<GameObject objectCoords={[[200, 133, Type.DISAPPEARING_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]]}/>);
        expect(getByTestId('renderedGameObject').className).toBe('disappearing-platform');
    });

});

it('matches snapshot', () => {
    const tree = TestRenderer.create(<GameObject objectCoords={objectCoords}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

