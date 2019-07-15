import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import { makeExportable } from './util/JSON';

export const store = admin.firestore();
export var gctx: CallableContext;

// Creates a wrapped https trigger 
export function onHttpsCall(func: (data: any, ctx: CallableContext) => any) {
    return functions
        .https.onCall(async (data, ctx) => {
        gctx = ctx;
        try {
            let result = await func(data, ctx);
            return await makeExportable({
                success: true,
                ...result
            });
        }
        catch (e) {
            console.error(e);
            
            let message = null;
            if (e instanceof Error)
                message = e.message;
            return {
                success: false,
                code: e.code,
                message
            };
        }
    });
}