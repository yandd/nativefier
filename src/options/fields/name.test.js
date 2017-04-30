import name from './name';
import { DEFAULT_APP_NAME } from './../../constants';
import { inferTitle } from './../../infer';

let mockedResult = 'mock name';
jest.mock('./../../infer/inferTitle', () => jest.fn(() => Promise.resolve(mockedResult)));

describe('when a name parameter is passed', () => {
  describe('when it is well formed', () => {
    test('it should not call inferTitle', () => {
      expect(inferTitle).toHaveBeenCalledTimes(0);
      const params = { name: 'appname' };
      expect(name(params)).toBe(params.name);
    });
  });

  describe('when the name is undefined', () => {
    test('it should call inferTitle', () => {
      const params = { targetUrl: 'some url' };

      return name(params).then(() => {
        expect(inferTitle).toHaveBeenCalledWith(params.targetUrl);
      });
    });
  });

  describe('when the name is an empty string', () => {
    test('it should call inferTitle', () => {
      const params = { targetUrl: 'some url', name: '' };

      return name(params).then(() => {
        expect(inferTitle).toHaveBeenCalledWith(params.targetUrl);
      });
    });

    test('it should return the result from inferTitle', () => {
      const params = { targetUrl: 'some url', name: '' };

      return name(params).then((result) => {
        expect(result).toBe(mockedResult);
        expect(inferTitle).toHaveBeenCalledWith(params.targetUrl);
      });
    });

    describe('when the returned pageTitle is falsey', () => {
      test('it should return the default app name', () => {
        mockedResult = null;
        const params = { targetUrl: 'some url', name: '' };

        return name(params).then((result) => {
          expect(result).toBe(DEFAULT_APP_NAME);
          expect(inferTitle).toHaveBeenCalledWith(params.targetUrl);
        });
      });
    });
  });
});

