import React from 'react';
import {checkCollision} from '../gameHelpers';
import {doPlatformMove} from '../gameHelpers';
import {doJumperMove} from '../gameHelpers';
import {doHorizontalPlatformMove} from '../gameHelpers';
import { render, cleanup  } from '@testing-library/react';
import {MovingDirection, Type, Visibility} from '../Enums';

afterEach(cleanup);

describe('check collision test', () => {

    test('doodler should collide with normal platform', () => {
        expect(checkCollision([200,300],[[200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],true, false)[0]).toBe(true);
    });

    test('doodler doesnt collide with platform when height > 550', () => {
        expect(checkCollision([200,551],[[200, 300,Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],true,false)[0]).toBe(false);
    });

    test('doodler must not collide with broken platform', () => {
        expect(checkCollision([200,300],[[200, 300, Type.BROKEN_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],true,false)[0]).toBe(false);
    });

    test('doodler must not collide with broken-destroyed platform', () => {
        expect(checkCollision([200,300],[[200, 300,Type.BROKENDESTROYED_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],true,false)[0]).toBe(false);
    });

    test('doodler should collide with disappearing platform', () => {
        expect(checkCollision([200,300],[[200, 300,Type.DISAPPEARING_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],true,false)[0]).toBe(true);
    });

    test('when doodler collides with disappearing platform, the platform disappears', () => {
        expect(checkCollision([200,300],[[200, 300, Type.DISAPPEARING_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],true,false)[1]).toStrictEqual([[200, 300,Type.DISAPPEARING_PLATFORM, Visibility.INVISIBLE, MovingDirection.LEFT]]);
    });

});

describe('vertical platform movement tests', () => {

    test('platforms must not move when doodler height < 250', () => {
        expect(doPlatformMove([200,245],[[200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],48)[0]).toStrictEqual([200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]);
    });

    test('platforms should move 6 pixels down when doodler height = 300', () => {
        expect(doPlatformMove([200,300],[[200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],48)[0]).toStrictEqual([200, 294, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]);
    });

    test('platforms should move 8 pixels down when doodler height = 360', () => {
        expect(doPlatformMove([200,360],[[200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],48)[0]).toStrictEqual([200, 292,Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]);
    });

    test('bottom-platform should be removed when reaching height 0', () => {
        expect(doPlatformMove([200,360],[[200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],[200, 0, Type.BOTTOM_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],48)[0]).toStrictEqual([200, 292,Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]);
    });

    test('new platform should be spawned when a platform reaches height 0', () => {
        expect(doPlatformMove([200,360],[[200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT],[200, 0,Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]],48).length).toBe(2);
    });

});

describe('horizontal platform movement tests', () => {

    test('don\'t move platforms that are not of type moving-platform', () => {
        expect(doHorizontalPlatformMove([[200, 300, Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]])).toStrictEqual([[200, 300,Type.NORMAL_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]]);
    });

    test('move platform 1 pixel to the left', () => {
        expect(doHorizontalPlatformMove([[200, 300, Type.LEFTRIGHTMOVING_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]])).toStrictEqual([[199, 300,Type.LEFTRIGHTMOVING_PLATFORM, Visibility.VISIBLE, MovingDirection.LEFT]]);
    });

    test('move platform 1 pixel to the right', () => {
        expect(doHorizontalPlatformMove([[5, 300, Type.LEFTRIGHTMOVING_PLATFORM, Visibility.VISIBLE, MovingDirection.RIGHT]])).toStrictEqual([[6, 300, Type.LEFTRIGHTMOVING_PLATFORM, Visibility.VISIBLE, MovingDirection.RIGHT]]);
    });

});

describe('doodler movement tests', () => {

    test('doodler should move 5 pixels to the right', () => {
        expect(doJumperMove([200,360],5,'RIGHT',5)).toStrictEqual([205,360]);
    });

    test('when doodler left distance > 450, doodler left distance should be 5', () => {
        expect(doJumperMove([451,360],5,'RIGHT',5)).toStrictEqual([5,360]);
    });

    test('doodler should move 5 pixels to the left', () => {
        expect(doJumperMove([200,360],5,'LEFT',5)).toStrictEqual([195,360]);
    });

    test('when doodler left distance < 0, doodler left distance should be 450', () => {
        expect(doJumperMove([-1,360],5,'LEFT',5)).toStrictEqual([450,360]);
    });

    test('doodler should move 5 pixels down', () => {
        expect(doJumperMove([200,360],5,'DOWN',5)).toStrictEqual([200,355]);
    });

    test('doodler should move 5 pixels up', () => {
        expect(doJumperMove([200,360],5,'UP',5)).toStrictEqual([200,365]);
    });

});









