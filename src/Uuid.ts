import { Buffer } from 'node:buffer';
import { validate as validateUUID } from 'uuid';
import { uuidv7 } from 'uuidv7';
import { UuidInitializer } from './types';

export class Uuid {
  private readonly value: Buffer;

  readonly initializer: UuidInitializer;

  public static bufferToUuidHex(buffer: Buffer): string {
    return buffer.toString('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  }

  public static uuidBufferFromHex(uuidHexString: string): Buffer {
    return Buffer.from(uuidHexString.replace(/-/g, ''), 'hex');
  }

  public static isUuidHexString(uuid: string | Buffer): boolean {
    try {
      return typeof uuid === 'string' && validateUUID(uuid);
    } catch (e) {
      return false;
    }
  }

  public static isUuidBase64String(uuid: string | Buffer): Buffer | null {
    try {
      const buf64 = Buffer.from(uuid as string, 'base64');
      if (validateUUID(Uuid.bufferToUuidHex(buf64))) {
        return buf64;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  constructor(uuid?: string | Buffer, hint?: UuidInitializer) {
    // New uuid
    if (!hint && !uuid) {
      this.value = Uuid.uuidBufferFromHex(uuidv7());
      this.initializer = UuidInitializer.HEX;
      return;
    }

    // Try: HEX STRING
    if (hint === 'hex' || (Uuid.isUuidHexString(uuid as string))) {
      this.value = Uuid.uuidBufferFromHex(uuid as string);
      this.initializer = UuidInitializer.HEX;
      return;
    }

    // Try: BUFFER
    if (hint === 'buffer' || (uuid instanceof Buffer && validateUUID(Uuid.bufferToUuidHex(uuid)))) {
      this.value = uuid as Buffer;
      this.initializer = UuidInitializer.BUFFER;
      return;
    }

    // Try: BASE64 STRING
    if (hint === 'base64') {
      this.value = Buffer.from(uuid as string, 'base64');
      this.initializer = UuidInitializer.BASE64;
      return;
    }
    if (typeof uuid === 'string') {
      const buf64 = Uuid.isUuidBase64String(uuid);
      if (buf64) {
        this.value = buf64;
        this.initializer = UuidInitializer.BASE64;
        return;
      }
    }

    throw new Error('Unsupported uuid constructor or hint');
  }

  static fromHex(hexString: string): Uuid {
    return new Uuid(hexString, UuidInitializer.HEX);
  }

  static fromBase64(base64String: string): Uuid {
    return new Uuid(base64String, UuidInitializer.BASE64);
  }

  static fromBuffer(buffer: Buffer): Uuid {
    return new Uuid(buffer, UuidInitializer.BUFFER);
  }

  toHex(): string {
    return Uuid.bufferToUuidHex(this.value);
  }

  toBase64(): string {
    return this.value.toString('base64');
  }

  toBuffer(): Buffer {
    return this.value;
  }

  toString(bufferEncoding: BufferEncoding = 'hex'): string {
    if (bufferEncoding === 'hex') return this.toHex();
    return this.value.toString(bufferEncoding);
  }

  static validateUuidString(hexOrBase64: string): Uuid | null {
    try {
      return new Uuid(hexOrBase64);
    } catch (e) {
      return null;
    }
  }

  toInstance<Type>(Constructor: new (buffer: Buffer) => Type) {
    return new Constructor(this.value);
  }
}
