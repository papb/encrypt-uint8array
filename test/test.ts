import test from 'ava';

import {
	encryptUint8Array,
	decryptUint8Array,
	DecryptionError,
	encodeString as encode,
	decodeString as decode
} from '../source';

test('It works', async t => {
	const secret = encode('This is the secret');
	const password = encode('P4s$w0Rd!');

	const encrypted = await encryptUint8Array(secret, password);
	t.true(encrypted instanceof Uint8Array);

	const decrypted = await decryptUint8Array(encrypted, password);
	t.true(decrypted instanceof Uint8Array);

	t.deepEqual(decrypted, secret);
	t.is(decode(decrypted), 'This is the secret');
});

test('It throws when decrypting with wrong password', async t => {
	const secret = encode('This is the secret');
	const password = encode('P4s$w0Rd!');

	const encrypted = await encryptUint8Array(secret, password);
	t.true(encrypted instanceof Uint8Array);

	await t.throwsAsync(async () => {
		await decryptUint8Array(encrypted, encode('Wrong Password'));
	}, {
		instanceOf: DecryptionError,
		message: 'Unable to decrypt - password is incorrect or data is corrupted.'
	});
});

test('It throws when decrypting a unencrypted value', async t => {
	await t.throwsAsync(async () => {
		await decryptUint8Array(encode('foo'), encode('bar'));
	}, {
		instanceOf: DecryptionError,
		message: 'Unable to decrypt - password is incorrect or data is corrupted.'
	});
});

test('It decrypts a valid Uint8Array directly', async t => {
	const encryptedData = new Uint8Array(
		[0, 1, 1, 65, 12, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 22, 0, 0, 0, 173, 158, 136, 201, 19, 75, 104, 81, 196, 247, 105, 255, 204, 140, 3, 96, 105, 104, 76, 84, 202, 73, 17, 130, 8, 150, 125, 134, 64, 13, 3, 0, 16, 0, 186, 198, 55, 166, 120, 218, 131, 130, 48, 128, 149, 6, 130, 255, 32, 147, 218, 229, 131, 59, 61, 35, 17, 249, 240, 226, 222, 42, 183, 144, 27, 64, 117]
	);

	const decrypted = await decryptUint8Array(encryptedData, encode('b&n-^WyfCf:v50,Rf+1)~}:tw_.:uC'));

	t.true(decrypted instanceof Uint8Array);
	t.is(decode(decrypted), 'Another secret...');
});
