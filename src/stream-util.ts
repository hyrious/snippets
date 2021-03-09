import { Writable, Transform } from "stream";

export class DevNull extends Writable {
    _write(_chunk: any, _encoding: string, next: (...args: any) => void) {
        setImmediate(next);
    }
}

export class ProgressTransform extends Transform {
    size = 0;
    _transform(chunk: any, encoding: string, next: (...args: any) => void) {
        this.size += chunk.length;
        console.log(this.size);
        this.push(chunk);
        setImmediate(next);
    }
}
