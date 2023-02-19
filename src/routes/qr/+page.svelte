<script>
	import Qrcode from 'qrcode';

	import supabase from '../../lib/supabaseClient';
	import data from '../../lib/GuestData';

	// LIST OF GUESTS

	const guestData = data;
	let qrCodeData;

	const insertGuest = async (
		/** @type {any} */ name,
		/** @type {any} */ type,
		/** @type {any} */ description
	) => {
		let guestcode = randomString(name.length);
		try {
			const { data, error } = await supabase
				.from('guestsbook')
				.insert([
					{
						name: name,
						type: type,
						description: description,
						guest_code: guestcode
					}
				])
				.select();
			if (data) {
				generateQrCode(await data[0].guest_code, data[0].name);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const randomString = (/** @type {number} */ length) => {
		let character = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += character.charAt(Math.floor(Math.random() * character.length));
		}

		return '230323' + result;
	};

	/**
	 * @param {any} text
	 * @param {any} filename
	 */
	async function generateQrCode(text, filename) {
		try {
			const qrCode = await Qrcode.toDataURL(text, {
				width: 1920,
				errorCorrectionLevel: 'H'
			});
			qrCodeData = await qrCode;
			// console.log(qrCode);
			if (qrCodeData) {
				download(qrCodeData, filename);
			}
			// download( await qrCode);
			// return qrCode;
		} catch (error) {
			console.log(error);
		}
	}

	const generate = () => {
		guestData.forEach((guest) => {
			insertGuest(guest.name, guest.type, guest.description);
		});
	};

	/**
	 * @param {any} file
	 * @param {any} filename
	 */
	async function download(file, filename) {
		const response = await fetch(file);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<button on:click={generate}>Generate</button>
