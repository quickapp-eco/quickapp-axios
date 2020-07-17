export interface FetchTransformer {
  (data: any, headers?: any): any;
}

export interface FetchRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  transformResponse?: FetchTransformer | FetchTransformer[];
  headers?: any;
  params?: any;
  data?: any;
}

export interface FetchResponse<T = any> {
  data: T;
  code: number;
  headers: any;
  config: FetchRequestConfig;
}

export interface FetchError extends Error {
  config: FetchRequestConfig;
  code?: string;
}

export interface FetchPromise<T = any> extends Promise<FetchResponse<T>> {
}

export interface FetchInterceptorManager<V> {
  use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
  eject(id: number): void;
}

export interface FetchInstance {
  (config: FetchRequestConfig): FetchPromise;
  defaults: FetchRequestConfig;
  (url: string, config?: FetchRequestConfig): FetchPromise;
  interceptors: {
    request: FetchInterceptorManager<FetchRequestConfig>;
    response: FetchInterceptorManager<FetchResponse>;
  };
  get<T = any>(url: string, config?: FetchRequestConfig): FetchPromise<T>;
  delete(url: string, config?: FetchRequestConfig): FetchPromise;
  head(url: string, config?: FetchRequestConfig): FetchPromise;
  post<T = any>(url: string, data?: any, config?: FetchRequestConfig): FetchPromise<T>;
  put<T = any>(url: string, data?: any, config?: FetchRequestConfig): FetchPromise<T>;
  patch<T = any>(url: string, data?: any, config?: FetchRequestConfig): FetchPromise<T>;
}

export interface FetchStatic extends FetchInstance {
  create(config?: FetchRequestConfig): FetchInstance;
}

declare const Fetch: FetchStatic;

export default Fetch;
