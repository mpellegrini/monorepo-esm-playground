import 'reflect-metadata'
import { autoInjectable, container } from 'tsyringe'

describe('tsyringe', () => {
  it('@autoInjectable allows for injection to be performed without using .resolve()', () => {
    expect.hasAssertions()

    class Bar {
      id: string
      constructor() {
        this.id = '123'
      }
    }

    @autoInjectable()
    class Foo {
      constructor(public myBar: Bar) {
        console.log(myBar)
      }
    }

    const myFoo = container.resolve(Foo)

    expect(myFoo.myBar instanceof Bar).toBeTruthy()
  })
})
