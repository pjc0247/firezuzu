:fire: firezuzu :dog2::dog2::dog2::dog2:
=====

A set of basecodes and style guides for firebase functions that uses cloud firestore.

Why
----
`firebase functions` can be a good start to creating straightforward application/server. 
however, `firestore` doesn't. There're so many lack of features. You can easily find suffering people on stackoverflow if you decided to make something with firestore.<br>
This repository is just made for some people who want to make firebase application with less pain and solid structure.

Features
----
* Error Handling (with some predefined exceptions)
* Lazy Loading
* Object mapping(relations)

Overview
----
A simple `PlayerController` can be written as:
```ts
export interface PlayerModel {
    name: string;
    
    // Stores the last time user has been seen.
    presence: number;
}
export class Player extends BaseController<PlayerModel> {
    public static get players() { return store.collection('player'); }

    static get(uid: string) {
        let player = new Player(
            Player.players.doc(uid)
        );
        return player;
    }

    async toExportable() {
        await this.ensureDataExistInLocal();
        let data = this.data!;
        
        return {
            id: this.ref.id,
            name: data.name,
            presence: 
                DateTime.fromJSDate(data.presence).diffNow().minutes <= 10 ?
                'online' : 'offline'
        };
    }
}
```

A simple `GuildController` can be written as below, <br>
This shows how to construct your response (Object mapping).
```ts
export interface GuildModel {
    userIds: string[];
}
export class Guild extends BaseController<GuildModel> {
    /* ... */
    async toExportable() {
        await this.ensureDataExistInLocal();
        let data = this.data!;
        
        return {
            // Exporting a controller automatically converted to entity models.
            users: data.userIds.map(x => User.get(x))
        };
    }
}
```

Getting Started
----
Since `firezuzu` is not a library nor framework, it does not have any packages on `npm`.<br>
Just download this repository and starts dev from it.

Project Structure
----
Since this project also suggests you some style guides, let me describe you how the project structure should be.

```
functions/src/
  - api/  
  - controller/
  - db/
  - cron/
  - model/
  - thirdparty/
```

__api__<br>
Contains __api__ definitions which should be visible to clients.

__controller__<br>
`Controllers` actually communicates with database(firestore). This also contains `model` in __firezuzu__.

__db/__<br>
A home of static database files which does not mean `RDB` or `NOSQL` stuffs. 
I suggest you to store `.json` and some `.ts` files here which contains static data such as:
* A table of itmes with properties (name, price, droprate and specs)
* Sets of dialogues (NPC)
* Configs which should be stored in `.json` file.

__model/__<br>
Model definitions without controllers.


Error Handling
----
Cloud functions are really bad at error handling initially. They always send 500(INTERNAL SERVER ERROR) for unhandled exceptions and never let you know what exception was thrown actually.

This repository also contains some basic error handling stuffs and predefined exceptions.<br>
For example, if user requests without any authorization just throw a `NotAuthorizedException`.
```ts
if (ctx.auth === null)
    throw new NotAuthorizedException();
```

Splitting application into multiple .ts files
----
Firebase never guide you about this. I know there're already several questions about this on stackoverflow.<br>
It's pretty simple, just take a look into `index.ts`.<br>
<br>
What you all need is write lines of `export`s like below:
```ts
export * from './api/user';
export * from './api/guild';
export * from './api/ranking';
export * from './api/iap';
```
