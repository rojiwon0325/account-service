/**
 * @packageDocumentation
 * @module api.functional.oauth
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "nestia-fetcher";
import type { IConnection } from "nestia-fetcher";

import type { __object } from "./../../../../src/api/account/presentation/account.controller";

/**
 * @controller AccountController.callback()
 * @path GET /oauth/callback
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function callback
    (
        connection: IConnection
    ): Promise<callback.Output>
{
    return Fetcher.fetch
    (
        connection,
        callback.ENCRYPTED,
        callback.METHOD,
        callback.path()
    );
}
export namespace callback
{
    export type Output = __object;

    export const METHOD = "GET" as const;
    export const PATH: string = "/oauth/callback";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/oauth/callback`;
    }
}