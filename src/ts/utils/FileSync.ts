export interface IFileSet {
    has(itemId: string): boolean;
    delete(itemId: string): Promise<void>;
    copyTo(itemId: string, filesB: IFileSet): Promise<void>;
    getHash(itemId: string): string;
    getAll(): IterableIterator<string>;
}

export interface IFileStatusEntry {
    hashA: string;
    hashB: string;
}

export interface IFileSyncStatus {
    has(itemId: string): boolean;
    delete(itemId: string): Promise<void>;
    set(itemId: string, hashA: string, hashB: string): Promise<void>;
    get(itemId: string): IFileStatusEntry;
    getAll(): IterableIterator<string>;
}

export interface ISyncConflictResolver {
    (itemId: string): Promise<void>;
}

// inspiration: https://unterwaditzer.net/2016/sync-algorithm.html
export class FileSync{
    private readonly _filesA: IFileSet;
    private readonly _filesB: IFileSet;
    private readonly _status: IFileSyncStatus;
    private readonly _resolveConflict: ISyncConflictResolver;
    modified: boolean;
    
    constructor(filesA: IFileSet, filesB: IFileSet, status: IFileSyncStatus, resolveConflict: ISyncConflictResolver){
        this._filesA = filesA;
        this._filesB = filesB;
        this._status = status;
        this._resolveConflict = resolveConflict;
    }

    async syncFiles(): Promise<void>{
        let changed: boolean = false;
        const files = this.getAllFiles();
        for (let file of files) {
            await this.syncFile(file)
        }
    }

    private async syncFile(itemId: string): Promise<void>{
        const filesA = this._filesA;
        const filesB = this._filesB;
        const status = this._status;

        if (status.has(itemId)){
            if (filesA.has(itemId)){
                if (filesB.has(itemId)){
                    // check modification
                    await this.handleModification(itemId);
                }
                else {
                    // file has been deleted from B
                    await filesA.delete(itemId);
                    await status.delete(itemId);
                    this.modified = true;
                }
            }
            else
            {
                if (filesB.has(itemId)){
                    // file has been deleted from A
                    await filesB.delete(itemId);
                    await status.delete(itemId);
                    this.modified = true;
                }
                else {
                    // neither on A nor B
                    await status.delete(itemId);
                }
            }
        }
        else
            // not on status
        {
            if (filesA.has(itemId)){
                if (filesB.has(itemId)) {
                    // is on A and B but not on status. We cannot compare the hashes so we need to
                    console.log("not on status: ", itemId)

                    await this._resolveConflict(itemId);
                    this.modified = true;
                }
                else {
                    // only on A
                    console.log("only on A")
                    await filesA.copyTo(itemId, filesB);
                    await status.set(itemId, filesA.getHash(itemId), filesA.getHash(itemId));
                    this.modified = true;
                }
            }
            else
            {
                if (filesB.has(itemId)){
                    console.log("only on B")
                    // only on B
                    await filesB.copyTo(itemId, filesA);
                    await status.set(itemId, filesB.getHash(itemId), filesB.getHash(itemId));
                    this.modified = true;
                }
                // else it's on none
            }
        }
    }
    
    private async handleModification(itemId: string) {
        const filesA = this._filesA;
        const filesB = this._filesB;
        const status = this._status;

        const hashA = filesA.getHash(itemId);
        const hashB = filesB.getHash(itemId);
        const statusHashes = status.get(itemId);
        
        // console.log("handleModification ", itemId)
        // console.log("hashA ", hashA)
        // console.log("hashB ", hashB)

        // nothing changed
        if (hashA == statusHashes.hashA && hashB == statusHashes.hashB) {
            return;
        }

        // changed on A but not on B
        if (hashA != statusHashes.hashA && hashB == statusHashes.hashB) {
            console.log("changed on A but not on B", hashA, statusHashes.hashA)
            await filesA.copyTo(itemId, filesB);
            await status.set(itemId, filesA.getHash(itemId), filesA.getHash(itemId));
            this.modified = true;
        }
        // changed on B but not on A
        else if (hashA == statusHashes.hashA && hashB != statusHashes.hashB) {
            console.log("changed on B but not on A", hashB, statusHashes.hashB)
            await filesB.copyTo(itemId, filesA);
            await status.set(itemId, filesB.getHash(itemId), filesB.getHash(itemId));
            this.modified = true;
        }
        // changed on both
        else if (hashA != statusHashes.hashA && hashB != statusHashes.hashB) {
            await this._resolveConflict(itemId);
            this.modified = true;
        }
    }

    private getAllFiles(): string[] {
        const allFiles = new Set(this._status.getAll());
        const filesA = this._filesA.getAll();
        const filesB = this._filesB.getAll();

        for (let file of filesA) {
            allFiles.add(file);
        }
        for (let file of filesB) {
            allFiles.add(file);
        }
        return Array.from(allFiles);
    }
}