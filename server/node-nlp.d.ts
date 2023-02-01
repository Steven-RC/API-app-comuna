declare module 'node-nlp' {
    export class Nlp {
      process(text: string, callback: (err: Error, result: any) => void): void;
    }
  }