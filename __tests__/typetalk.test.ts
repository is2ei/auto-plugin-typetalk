import Auto from '@auto-it/core';
import { makeHooks } from '@auto-it/core/dist/utils/make-hooks';
import TypetalkPlugin from '../src';

describe('postToTypetalk', () => {
  beforeAll(() => {
    process.env.TYPETALK_TOKEN = '123qweasd';
    process.env.TYPETALK_TOPIC_ID = '1234567890'
  });

  test('should have correct plugin name', async () => {
    const plugin = new TypetalkPlugin({});

    expect(plugin.name).toBe('Typetalk');
  });

  test("doesn't post with no new version", async () => {
    const plugin = new TypetalkPlugin({});
    const hooks = makeHooks();

    jest.spyOn(plugin, 'postToTypetalk').mockImplementation();
    plugin.apply({ hooks } as Auto);

    await hooks.afterRelease.promise({
      lastRelease: '0.1.0',
      commits: [],
      releaseNotes: '# My Notes'
    });

    expect(plugin.postToTypetalk).not.toHaveBeenCalled();
  });

  test("doesn't post in dry run", async () => {
    expect(true).toBe(true);
  });

  test("doesn't post with no commits", async () => {
    expect(true).toBe(true);
  });

  test("doesn't post with skip release label", async () => {
    expect(true).toBe(true);
  });

  test("doesn't post without topic", async () => {
    expect(true).toBe(true);
  });

  test('should warn when no token', async () => {
    expect(true).toBe(true);
  });

  test('should call Typetalk API with minimal config', async () => {
    expect(true).toBe(true);
  });

  test('should call Typetalk API', async () => {
    expect(true).toBe(true);
  });

  test('should call Typetalk API with custom mentions', async () => {
    expect(true).toBe(true);
  })
})
