import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    success: boolean;
    message: string;
    stack: string;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta: TMeta;
  message: string;
  success: boolean;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
