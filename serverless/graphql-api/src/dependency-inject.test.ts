import type { Disposable } from 'typed-inject'
import { Scope, createInjector } from 'typed-inject'

describe('di tests', () => {
  it('typed-inject', () => {
    expect.hasAssertions()

    class Bar {
      id: string

      constructor() {
        this.id = '123'
      }
    }

    class Foo {
      constructor(public myBar: Bar) {
        console.log(myBar)
      }

      public static inject = ['mybar'] as const
    }

    const appInjector = createInjector().provideClass('mybar', Bar)

    const myFoo = appInjector.injectClass(Foo)

    expect(myFoo.myBar instanceof Bar).toBeDefined()
  })

  it('uses interfaces', async () => {
    expect.hasAssertions()

    interface Logger {
      info(message: string): void
    }

    class ConsoleLogger implements Logger {
      info(message: string): void {
        console.log(message)
      }
    }

    class MyService implements Disposable {
      constructor(bar: number, public log: Logger) {
        log.info(`bar is: ${bar}`)
        log.info('hello there')
      }
      dispose(): void {
        console.log('Foo disposed')
      }
      public static inject = ['bar', 'logger'] as const
    }
    const rootInjector = createInjector()
    const myService = rootInjector
      .provideFactory('bar', () => 5 + 5)
      .provideClass('logger', ConsoleLogger, Scope.Singleton)
      .injectClass(MyService)
    await rootInjector.dispose()
    expect(myService.log).toBeDefined()
  })
})
