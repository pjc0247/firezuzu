import { store, gctx } from "../common";

export class Log {
    public static get logs() { return store.collection('logs'); }

    static async write(action: string, message: string) {
        await this.logs.add({
            uid: gctx.auth ? gctx.auth.uid : null,
            action,
            message
        });
    }
}