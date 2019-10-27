declare module 'gitlog' {
  export interface ICommit {
    hash: string;
    authorName?: string;
    authorEmail?: string;
    subject: string;
    rawBody?: string;
    labels?: string[];
    files: string[];
  }
  
  interface IGitlogOptions {
    repo: string;
    fields: string[];
    branch: string;
    number: number;
    execOptions: {
      maxBuffer: number;
    };
  }
  
  export default function gitlog(
    options: IGitlogOptions,
    callback: (err: Error, res: ICommit[]) => void
  ): void;
}
  