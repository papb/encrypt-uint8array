const MAXIMUM_ALLOWED_DATA_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB
const MAXIMUM_ALLOWED_PASSWORD_SIZE_BYTES = 10 * 1024; // 10 KB

function assertValidSize(array: Uint8Array, size: number, name: string): void {
	if (array.byteLength > size) {
		throw new Error(`Expected ${name} with at most ${size} bytes, got ${array.byteLength}`);
	}
}

export function assertDataSizeOk(data: Uint8Array): void {
	assertValidSize(data, MAXIMUM_ALLOWED_DATA_SIZE_BYTES, 'data');
}

export function assertPasswordSizeOk(password: Uint8Array): void {
	assertValidSize(password, MAXIMUM_ALLOWED_PASSWORD_SIZE_BYTES, 'password');

	if (password.byteLength === 0) {
		throw new Error('Unexpected empty password.');
	}
}
