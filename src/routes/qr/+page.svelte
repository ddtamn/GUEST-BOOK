<script>
	import Qrcode from 'qrcode';

	import supabase from '../../lib/supabaseClient';

	const guestData = [
		{
			name: 'ADE NURAMDANI, SH., S.I.K., M.M',
			type: 'VIP 1',
			description: 'KAPOLRES BANGGAI'
		},
		{
			name: 'MUH KHAIRIL AKBAR',
			type: 'VIP 1',
			description: ''
		},
		{
			name: 'SATOMY SUWARDI DUNGGA',
			type: 'VIP 1',
			description: 'PIMPINAN BNI CABANG LUWUK'
		},
		{
			name: 'IR. H. AMIRUDIN TAMOREKA',
			type: 'VIP 1',
			description: 'BUPATI BANGGAI'
		},
		{
			name: 'BAMBANG SUTEDDY',
			type: 'VIP 1',
			description: 'KEPAL DINAS PUPR'
		},
		{
			name: 'INDRAMULIA HENDRO SUNDAH',
			type: 'VIP 1',
			description: 'PEMIMPIN PEMASARAN'
		},
		{
			name: 'FEISAL MUHAMMAD IQBAL',
			type: 'VIP 1',
			description: 'PIMPINAN KCP TOILI'
		}
	];

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

	// const generateQrCode = async (/** @type {any} */ text) => {
	// 	try {
	// 		const qrCode = await Qrcode.toDataURL(text, {
	// 			width: 1920,
	// 			errorCorrectionLevel: 'H'
	// 		});
	// 		qrCodeData = await qrCode;
	// 		console.log(qrCode);
	// 		// return qrCode;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

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

	// const download = async (/** @type {any} */ file) => {
	// 	const response = await fetch('file');
	// 	const blob = await response.blob();
	// 	const url = URL.createObjectURL(blob);
	// 	const a = document.createElement('a');
	// 	a.href = url;
	// 	a.download = 'image.png';
	// 	document.body.appendChild(a);
	// 	a.click();
	// 	document.body.removeChild(a);
	// };

	// generateQrCode('diditamin');
</script>

<button on:click={generate}>Generate</button>
