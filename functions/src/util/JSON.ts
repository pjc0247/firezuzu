async function reformer(key: string, value: any) {
    if (value && value.toExportable !== undefined) {
        return await value.toExportable();
    }
    return value;
}
export function toJSON(object: any) {
    return JSON.stringify(object, reformer, 2);
}

export async function makeExportable(object: any) {
    if (!object) return object;

    for (let kv of Object.entries(object)) {
        let key = kv[0];
        let value:any = kv[1];
        
        if (value && value.toExportable !== undefined) {
            object[key] = await makeExportable(await value.toExportable());
        }
        else if (Array.isArray(value)) {
            object[key] = await makeExportable(object[key]);
        }
    }

    return object;
}