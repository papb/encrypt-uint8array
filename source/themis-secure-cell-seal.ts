// eslint-disable-next-line @typescript-eslint/no-var-requires
const themis = require('wasm-themis');

type ThemisSecureCell = {
	encrypt: (plaintext: Uint8Array) => Uint8Array;
	decrypt: (encryptedData: Uint8Array) => Uint8Array;
};

export async function getThemisSecureCellSeal(password: Uint8Array): Promise<ThemisSecureCell> {
	await themis.initialized;

	// Themis accepts `password` as Uint8Array, ArrayBuffer or string. The first
	// thing they do is convert it to Uint8Array if needed, so let's just use
	// Uint8Array directly.
	const cell = themis.SecureCellSeal.withPassphrase(password);
	return {
		encrypt: plaintext => cell.encrypt(plaintext),
		decrypt: encryptedData => cell.decrypt(encryptedData)
	};
}
