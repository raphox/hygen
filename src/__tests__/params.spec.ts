import path from 'path'
import params from '../params'

const fixture = (...segments) =>
  path.join(__dirname, 'fixtures', 'templates', ...segments)

describe('params', () => {
  process.env.HYGEN_TS = '1337'
  beforeEach(() => {
    process.env.HYGEN_TMPLS = undefined
  })
  it('dont take template folder in template', async () => {
    const args = await params(
      { templates: fixture('template-folder-in-templates', '_templates') },
      ['dont-take-this', 'foo', 'bar', 'baz'],
    )
    expect(args).toEqual({
      _: ['dont-take-this', 'foo', 'bar', 'baz'],
      action: 'foo',
      name: 'bar',
      subaction: undefined,
      actionfolder: fixture(
        'template-folder-in-templates',
        '_templates',
        'dont-take-this',
        'foo',
      ),
      generator: 'dont-take-this',
      templates: fixture('template-folder-in-templates', '_templates'),
      ts: '1337',
    })
  })

  it('env var overrides local templates but still take explicitly given templates', async () => {
    process.env.HYGEN_TMPLS = fixture('templates-override', 'tmpls')
    const args = await params(
      { templates: fixture('templates-override', '_templates') },
      ['dont-take-this', 'foo', 'bar', 'baz'],
    )
    expect(args).toEqual({
      _: ['dont-take-this', 'foo', 'bar', 'baz'],
      action: 'foo',
      name: 'bar',
      subaction: undefined,
      generator: 'dont-take-this',
      actionfolder: fixture(
        'templates-override',
        '_templates',
        'dont-take-this',
        'foo',
      ),
      templates: fixture('templates-override', '_templates'),
      ts: '1337',
    })
  })
})
