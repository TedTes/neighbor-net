declare module NodeJS {
  interface Module {
    hot?: {
      accept(deps: string[], callback: () => void): void;
      accept(deps: string, callback: () => void): void;
      decline(deps: string | string[]): void;
      dispose(callback: () => void): void;
      addDisposeHandler(callback: () => void): void;
      removeDisposeHandler(callback: () => void): void;
      check(
        apply: boolean,
        callback: (err: any, updatedModules: string[]) => void
      ): void;
      apply(
        options: any,
        callback: (err: any, updatedModules: string[]) => void
      ): void;
    };
  }
}
