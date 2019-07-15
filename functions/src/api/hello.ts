import { NotAuthorizedError } from '../error';
import { onHttpsCall } from '../common';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import * as messagesDB from '../db/messages.json';

export const hello = onHttpsCall(async (data, ctx) => {
    if (!ctx.auth)
        throw new NotAuthorizedError();

    return {
        message: messagesDB['hello']
    };
});