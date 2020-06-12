export interface IGraphQLFields<F> {
  select: Array<keyof F>;
  relations?: string[];
}
