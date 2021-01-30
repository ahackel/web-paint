export default abstract class StorageAdapter {
    abstract getItem(id: string): Promise<unknown>;
    abstract setItem(id: string, blob: Blob): Promise<unknown>;
    abstract removeItem(id: string): Promise<unknown>;
    abstract keys(): Promise<unknown>;
    abstract clear(): void;
}