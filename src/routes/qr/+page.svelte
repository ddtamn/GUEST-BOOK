<!-- <script>
	import Qrcode from 'qrcode';

	import supabase from '../../lib/supabaseClient';
	import data from '../../lib/GuestData';
	import { onMount } from 'svelte';

	// LIST OF GUESTS

	const guestData = data;
	/**
	 * @type {string}
	 */
	let qrCodeData;

	const insertGuest = async (
		/** @type {any} */ name,
		/** @type {any} */ type,
		/** @type {any} */ description
	) => {
		let guestcode = randomString(6);
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
	 * @type {HTMLCanvasElement}
	 */
	let canvasElement;
	let newFileName = 124;
	/**
	 * @param {any} text
	 * @param {any} filename
	 */
	async function generateQrCode(text, filename) {
		try {
			const qrCode = await Qrcode.toDataURL(text, {
				width: 1000,
				errorCorrectionLevel: 'H'
			});
			qrCodeData = await qrCode;
			// console.log(qrCode);
			if (qrCodeData) {
				let context = canvasElement.getContext('2d');
				if (context) {
					let img = new Image();
					img.src = qrCodeData;
					context.font = '24px Poppins';
					context.textAlign = 'center';
					context.fillStyle = 'black';

					img.onload = function () {
						context?.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
						context?.fillText(`RR${newFileName.toString()}`, canvasElement.width / 2, 950);
						// console.log(canvasElement.toDataURL());
						download(canvasElement.toDataURL(), newFileName);
					};
				}
			}
			// download( await qrCode);
			// return qrCode;
		} catch (error) {
			console.log(error);
		}
	}

	onMount(() => {
		canvasElement = document.createElement('canvas');
		canvasElement.height = 1000;
		canvasElement.width = 1000;
	});

	let index = 0;

	const generate = () => {
		insertGuest('', 'GUEST', '');
		// index++;
		newFileName++;
		// guestData.forEach((guest) => {
		// 	insertGuest(guest.name, guest.type, guest.description);
		// });
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

<button on:click={generate}>Generate</button> -->
<!-- <script>
	import supabase from '../../lib/supabaseClient';
	const data = [
		{
			name: '',
			type: 'TEMAN KANTOR',
			description: 'Karyawan / Staf BNI'
		},
		{ name: 'LISS VONNY', type: 'GUEST', description: '' },
		{ name: 'KHAIRUL BAGAS', type: 'GUEST', description: '' },
		{ name: 'GANDA GARNIDA', type: 'GUEST', description: '' },
		{ name: 'MARA HAKIM NASUTION', type: 'GUEST', description: '' },
		{ name: 'DAVID PRATAMA', type: 'GUEST', description: '' },
		{ name: 'KOKO PERWIRA', type: 'GUEST', description: '' },
		{ name: 'EKO SETIAWAN', type: 'GUEST', description: '' },
		{ name: 'SUTARNO', type: 'GUEST', description: '' },
		{ name: 'FENNY OPING', type: 'GUEST', description: '' },
		{ name: 'EMBO DEMSY SIDANGOLI', type: 'GUEST', description: '' },
		{ name: 'CAHYADI PURWAKA PUTRA', type: 'GUEST', description: '' },
		{ name: 'DEWANTA', type: 'GUEST', description: '' },
		{ name: 'HASIM PRATAMA PUTRA', type: 'GUEST', description: '' },
		{ name: 'RISNA', type: 'GUEST', description: '' },
		{ name: 'MUHAMMAD FARIJ NUR IHSAN', type: 'GUEST', description: '' },
		{ name: 'NURUL INTAN HANIFAH', type: 'GUEST', description: '' },
		{ name: 'ZHEIN BARAIKO', type: 'GUEST', description: '' },
		{ name: 'VITRY MEYLANI MAEDJA', type: 'GUEST', description: '' },
		{ name: 'ROY ALI M', type: 'GUEST', description: '' }
	];

	const randomString = (/** @type {number} */ length) => {
		let character = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += character.charAt(Math.floor(Math.random() * character.length));
		}

		return '230323' + result;
	};

	const insertGuest = async (
		/** @type {any} */ name,
		/** @type {any} */ type,
		/** @type {any} */ description
	) => {
		let guestcode = randomString(name.length || 8);
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
				console.log(data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const generate = () => {
		for (let i = 0; i < data.length; i++) {
			insertGuest(data[i].name, data[i].type, data[i].description);
		}
	};
</script>

<button on:click={generate}>Generate</button> -->
