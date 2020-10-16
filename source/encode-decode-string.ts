import { TextEncoder, TextDecoder } from 'util';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const encodeString: (string: string) => Uint8Array = encoder.encode.bind(encoder);
export const decodeString: (array: Uint8Array) => string = decoder.decode.bind(decoder);
