import React from 'react';
import ReactDOM from 'react-dom';
import Jumper from '../Jumper';
import {render, cleanup} from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

afterEach(cleanup);

const doodlerCoords = [200, 150];

it('renders jumper correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Jumper image="1" doodlerCoords={doodlerCoords}/>, div);
});

it('sets the css attribute bottom correctly', () => {
    const {getByTestId} = render(<Jumper image="1" doodlerCoords={doodlerCoords}/>);
    expect(getByTestId('jumper').style.bottom).toBe(doodlerCoords[1] + 'px');
});

it('sets the css attribute left correctly', () => {
    const {getByTestId} = render(<Jumper image="1" doodlerCoords={doodlerCoords}/>);
    expect(getByTestId('jumper').style.left).toBe(doodlerCoords[0] + 'px');
});

it('sets the css attribute scaleX(1) correctly', () => {
    const {getByTestId} = render(<Jumper image="1" doodlerCoords={doodlerCoords}/>);
    expect(getByTestId('jumper').style.transform).toBe('scaleX(1)');
});

it('sets the css attribute scaleX(-1) correctly', () => {
    const {getByTestId} = render(<Jumper image="-1" doodlerCoords={doodlerCoords}/>);
    expect(getByTestId('jumper').style.transform).toBe('scaleX(-1)');
});

it('matches snapshot', () => {
    const tree = TestRenderer.create(<Jumper image="1" doodlerCoords={doodlerCoords}/>).toJSON();
    expect(tree).toMatchSnapshot();
});



