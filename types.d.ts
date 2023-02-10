import type {FunctionComponent, PropsWithChildren} from 'react';

declare module 'react' {
    type FC17<P = object> = FunctionComponent<PropsWithChildren<P>>;
    type VFC17<P = object> = FunctionComponent<P>;
}