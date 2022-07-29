import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Dog = {
  __typename?: 'Dog';
  ageInWeeks: Scalars['Float'];
  attributes: Array<DogAttribute>;
  availableDate: Scalars['String'];
  breed: Scalars['String'];
  color: Scalars['String'];
  description: Array<Scalars['String']>;
  fee: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['ID'];
  sex: Scalars['String'];
  weight: Scalars['Float'];
};

export type DogAttribute = {
  __typename?: 'DogAttribute';
  key: Scalars['ID'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dog?: Maybe<Dog>;
  dogs: Array<Dog>;
};


export type QueryDogArgs = {
  name: Scalars['String'];
};

export type GetDogByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetDogByNameQuery = { __typename?: 'Query', dog?: { __typename?: 'Dog', name: string, description: Array<string>, ageInWeeks: number, image: string, sex: string, color: string, breed: string, fee: number, weight: number, availableDate: string, attributes: Array<{ __typename?: 'DogAttribute', key: string, value: string }> } | null };

export type GetDogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDogsQuery = { __typename?: 'Query', dogs: Array<{ __typename?: 'Dog', name: string, description: Array<string>, ageInWeeks: number, image: string, sex: string, color: string, breed: string, fee: number, weight: number, availableDate: string, attributes: Array<{ __typename?: 'DogAttribute', key: string, value: string }> }> };


export const GetDogByNameDocument = gql`
    query getDogByName($name: String!) {
  dog(name: $name) {
    name
    attributes {
      key
      value
    }
    description
    ageInWeeks
    image
    sex
    color
    breed
    fee
    weight
    availableDate
  }
}
    `;
export const GetDogsDocument = gql`
    query getDogs {
  dogs {
    name
    attributes {
      key
      value
    }
    description
    ageInWeeks
    image
    sex
    color
    breed
    fee
    weight
    availableDate
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getDogByName(variables: GetDogByNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDogByNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDogByNameQuery>(GetDogByNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDogByName', 'query');
    },
    getDogs(variables?: GetDogsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDogsQuery>(GetDogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDogs', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;