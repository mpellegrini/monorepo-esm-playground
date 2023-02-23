import { App, type AppProps } from 'aws-cdk-lib'

export class BaseApp extends App {
  constructor(props: AppProps = {}) {
    super({
      ...props,
      analyticsReporting: false,
      stackTraces: false,
      autoSynth: false,
    })
  }
}
