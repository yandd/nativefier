import icon from './icon';
import { inferIcon } from './../../infer';

jest.mock('./../../infer/inferIcon');

test('when a icon parameter is passed', () => {
  expect(inferIcon).toHaveBeenCalledTimes(0);

  const params = { icon: './icon.png' };
  expect(icon(params)).toBe(params.icon);
});

test('no icon parameter is passed', () => {
  const params = { targetUrl: 'some url', platform: 'mac' };

  icon(params);
  expect(inferIcon).toHaveBeenCalledWith(params.targetUrl, params.platform);
});

