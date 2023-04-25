import { createInjector } from 'typed-inject'

describe('typed-inject', () => {
  it('basic test', () => {
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

    expect(myFoo.myBar instanceof Bar).toBeTruthy()
  })
})
