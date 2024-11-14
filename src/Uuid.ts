import { Buffer } from 'node:buffer';
import { validate as validateUUID } from 'uuid';
import { uuidv7 } from 'uuidv7';
import { UuidInitializer } from './types';

/**
 * A class to encapsulate an UUID, with support for HEX, BASE64 and BUFFER representations.
 * @export
 * @class Uuid
 */
export class Uuid {
  /**
   * The internal buffer representation of the UUID.
   * @private
   * @type {Buffer}
   * @memberof Uuid
   */
  private readonly value: Buffer;

  /**
   * The initializer used to create the UUID.
   * @type {UuidInitializer}
   * @memberof Uuid
   */
  readonly initializer: UuidInitializer;

  /**
   * Converts a buffer to a UUID string.
   * @static
   * @param {Buffer} buffer
   * @return {string}
   * @memberof Uuid
   */
  public static bufferToUuidHex(buffer: Buffer): string {
    return buffer.toString('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  }

  /**
   * Converts a UUID string to a buffer.
   * @static
   * @param {string} uuidHexString
   * @return {*}  {Buffer}
   * @memberof Uuid
   */
  public static uuidBufferFromHex(uuidHexString: string): Buffer {
    return Buffer.from(uuidHexString.replace(/-/g, ''), 'hex');
  }

  /**
   * Determines if a string or a buffer is a valid UUID in HEX format, using the `uuid` package.
   * @static
   * @param {(string | Buffer)} uuid
   * @return {boolean}
   * @memberof Uuid
   */
  public static isUuidHexString(uuid: string | Buffer): boolean {
    try {
      return typeof uuid === 'string' && validateUUID(uuid);
    } catch (e) {
      return false;
    }
  }

  /**
   * Determines if a string is a valid UUID in BASE64 format, returning the parsed buffer if it is valid.
   * @static
   * @param {string | Buffer} uuid
   * @return {Buffer | null}
   * @memberof Uuid
   */
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

  /**
   * Creates an instance of Uuid.
   * @param {(string | Buffer)} [uuid] (Optional) The UUID in HEX, BASE64 or BUFFER format. If not provided, a new UUID v7 will be generated.
   * @param {UuidInitializer} [hint] (Optional) The hint to determine the UUID format and avoid unnecessary checks.
   * @memberof Uuid
   */
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

  /**
   * Creates a new UUID from a HEX string.
   * @static
   * @param {string} hexString The UUID in HEX format.
   * @return {Uuid}
   * @memberof Uuid
   */
  static fromHex(hexString: string): Uuid {
    return new Uuid(hexString, UuidInitializer.HEX);
  }

  /**
   * Creates a new UUID from a BASE64 string.
   * @static
   * @param {string} base64String The UUID in BASE64 format.
   * @return {Uuid}
   * @memberof Uuid
   */
  static fromBase64(base64String: string): Uuid {
    return new Uuid(base64String, UuidInitializer.BASE64);
  }

  /**
   * Creates a new UUID from a buffer.
   * @static
   * @param {Buffer} buffer The UUID in buffer format.
   * @return {Uuid}
   * @memberof Uuid
   */
  static fromBuffer(buffer: Buffer): Uuid {
    return new Uuid(buffer, UuidInitializer.BUFFER);
  }

  /**
   * Returns the UUID in HEX format (UUID string).
   * @return {string}
   * @memberof Uuid
   */
  toHex(): string {
    return Uuid.bufferToUuidHex(this.value);
  }

  /**
   * Returns the UUID in BASE64 format.
   * @return {string}
   * @memberof Uuid
   */
  toBase64(): string {
    return this.value.toString('base64');
  }

  /**
   * Returns the internal buffer representation of the UUID.
   * @return {Buffer}
   * @memberof Uuid
   */
  toBuffer(): Buffer {
    return this.value;
  }

  /**
   * Returns the UUID as a string in the specified encoding (default: HEX).
   * @param {BufferEncoding} [bufferEncoding='hex']
   * @return {string}
   * @memberof Uuid
   */
  toString(bufferEncoding: BufferEncoding = 'hex'): string {
    if (bufferEncoding === 'hex') return this.toHex();
    return this.value.toString(bufferEncoding);
  }

  /**
   * Validates a UUID string and returns a new Uuid instance if it is valid.
   * @static
   * @param {string} hexOrBase64 The UUID in HEX or BASE64 format.
   * @return {(Uuid | null)}
   * @memberof Uuid
   */
  static validateUuidString(hexOrBase64: string): Uuid | null {
    try {
      return new Uuid(hexOrBase64);
    } catch (e) {
      return null;
    }
  }

  /**
   * Initializes a new instance of the specified class with the UUID buffer.
   * @template Type
   * @param {new (buffer: Buffer) => Type} Constructor The class constructor
   * @return {Type} The new instance of the class
   * @memberof Uuid
   */
  toInstance<Type>(Constructor: new (buffer: Buffer) => Type): Type {
    return new Constructor(this.value);
  }
}
