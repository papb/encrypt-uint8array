import { getThemisSecureCellSeal } from './themis-secure-cell-seal';
import { assertDataSizeOk, assertPasswordSizeOk } from './data-sizes';
import { DecryptionError } from './decryption-error';

export async function encryptUint8Array(data: Uint8Array, password: Uint8Array): Promise<Uint8Array> {
	assertDataSizeOk(data);
	assertPasswordSizeOk(password);

	const cell = await getThemisSecureCellSeal(password);
	return cell.encrypt(data);
}

export async function decryptUint8Array(data: Uint8Array, password: Uint8Array): Promise<Uint8Array> {
	assertDataSizeOk(data);
	assertPasswordSizeOk(password);

	try {
		const cell = await getThemisSecureCellSeal(password);
		return cell.decrypt(data);
	} catch {
		throw new DecryptionError('Unable to decrypt - password is incorrect or data is corrupted.');
	}
}
