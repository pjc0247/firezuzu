import { DocumentReference, FieldValue, Firestore } from "@google-cloud/firestore";
import { BaseController } from './base_controller';
import { store } from "../common";
import { Log } from './log';

export interface UserModel {
    name: string;
}

export class User extends BaseController<UserModel> {
    public static get users() { return store.collection('user'); }

    static get(uid: string) {
        let user = new User(
            store.collection('user').doc(uid)
        );
        return user;
    }
    static async getByName(name: string) {
        const users = (await User.users
            .where('name', '==', name)
            .get())
            .docs;
        
        if (users.length == 0)
            return null;
            
        return new User(users[0].ref, users[0].data());
    }

    async update(property : any) {
        property = _.pick(property, ['name']);
        await this.ref.update(property);
    }

    async toExportable() {
        await this.ensureDataExistInLocal();
        let data = this.data!;
        
        return {
            id: this.ref.id,
            name: data.name
        };
    }
}