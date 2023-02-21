<script>
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';
	import supabase from '../../lib/supabaseClient';
	import { v4 as uuidv4 } from 'uuid';

	/**
	 * @type {string | MediaTrackConstraints}
	 */
	export let cameraId;

	/**
	 * @type {any}
	 */
	let name;
	/**
	 * @type {any}
	 */
	let description;
	/**
	 * @type {any}
	 */
	let type;

	/**
	 * @type {any}
	 */
	let total_guest = 1;

	let showButtonStart = true;

	let showModal = false;
	/**
	 * @type {Html5Qrcode}
	 */
	let reader;

	let checkin_time = new Date();

	const sendToGreeting = (/** @type {any[]} */ data) => {
		const channel = supabase.channel('greeting').subscribe((status) => {
			if (status === 'SUBSCRIBED') {
				channel.send({
					type: 'broadcast',
					event: 'supa',
					payload: data[0]
				});
			}
		});
	};

	const openModal = (/** @type {any} */ data) => {
		name = data.name;
		description = data.description;
		type = data.type;
		showModal = true;
	};

	async function insertToGuestPresent() {
		const uuid = uuidv4();
		try {
			let { data, error } = await supabase
				.from('guestpresent')
				.insert([
					{
						name,
						description,
						type,
						code: uuid,
						total_guest: total_guest
					}
				])
				.select();
			if (data) {
				console.log(data);
				name = '';
				description = '';
				type = '';
				showModal = false;
				sendToGreeting(data);
				startScan();
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * @param {string} code
	 */
	async function getGuestCode(code) {
		try {
			if (code === 'rr230323fromonline') {
				let data = [
					{
						name: '',
						description: '',
						type: 'GUEST'
					}
				];

				openModal(data[0]);
			}
			let { data, error } = await supabase.from('guestsbook').select('*').eq('guest_code', code);
			if (error) {
				console.log(error);
			}
			if (data) {
				console.log(data);
				reader.stop();
				openModal(data[0]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const startScan = () => {
		reader.start(
			{ facingMode: 'environment' },
			{
				fps: 10, // Optional frame per seconds for qr code scanning
				qrbox: { width: 300, height: 300 } // Optional if you want bounded box UI
			},
			(decodedText, decodedResult) => {
				// do something when code is read
				if (decodedText) {
					getGuestCode(decodedText);
				}
				// console.log(decodedText, decodedResult);
				// alert(decodedText);
			},
			(errorMessage) => {
				// parse error, ideally ignore it.
				// console.log(errorMessage);
			}
		);
		showButtonStart = false;
	};

	onMount(() => {
		Html5Qrcode.getCameras().then((devices) => {
			if (devices && devices.length) {
				cameraId = devices[0].id;
			}
		});
		reader = new Html5Qrcode('reader', false);
	});
</script>

<div class="container">
	<div id="reader" />
	{#if showButtonStart}
		<div class="button-container">
			<button on:click={startScan}>Start Scan</button>
		</div>
	{/if}
	<!-- <button on:click={sendToGreeting}>Send</button> -->
	{#if showModal}
		<div class="modal">
			<div class="wrapper">
				<!-- <div class="close">&Chi</div> -->
				<div class="head">
					<p class="title">CHECK IN BERHASIL</p>
				</div>
				<div class="body">
					<div class="image">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png"
							alt=""
						/>
					</div>
					<div class="form-group">
						<label for="name" class="form-label">Guest Name</label>
						<input type="text" id="name" name="name" class="form-control" bind:value={name} />
					</div>
					<div class="form-group">
						<label for="description" class="form-label">Description</label>
						<input
							type="text"
							id="description"
							name="description"
							class="form-control"
							bind:value={description}
						/>
					</div>
					<div class="form-group">
						<label for="type" class="form-label">Guest Type</label>
						<select name="type" id="type" class="form-select" bind:value={type}>
							<option value="" />
							<option value="VIP 1">VIP 1</option>
							<option value="VIP 1">VIP 2</option>
							<option value="VIP 1">VIP 3</option>
							<option value="VIP 1">VIP 4</option>
						</select>
					</div>
					<div class="form-group">
						<label for="total_guest">Jumlah Tamu</label>
						<div class="form-count">
							<button
								on:click={() => (total_guest = total_guest - 1)}
								disabled={total_guest < 1 ? true : false}>-</button
							>
							<input type="text" bind:value={total_guest} readonly class="form-control" />
							<button on:click={() => (total_guest = total_guest + 1)}>+</button>
						</div>
					</div>
					<p style="margin-bottom: 1rem;">
						{`${checkin_time.getDate()}-${
							checkin_time.getMonth() + 1
						}-${checkin_time.getFullYear()} | ${checkin_time.getHours()}:${checkin_time.getMinutes()}:${checkin_time.getSeconds()}`}
					</p>
					<button class="submit-button" on:click={insertToGuestPresent}>Submit</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		/* display: flex;
		justify-content: center;
		align-items: center; */
	}

	.button-container {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button-container button {
		border-radius: 5px; /* adjust the value as needed */
		padding: 8px 20px;
		background-color: #70a9c4;
		color: #fff;
		border: none;
		font-size: 16px;
		cursor: pointer;
		transition: transform 0.2s ease-in-out; /* add transition property */
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(39, 39, 39, 0.479);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal .wrapper {
		background-color: whitesmoke;
		width: 90%;
		padding: 1rem;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
	}

	.title {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 1.5rem;
		color: #41a145;
	}

	/* .close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-family: sans-serif;
		font-weight: bold;
	} */

	.modal .body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.modal .body .image img {
		width: 150px;
		height: 150px;
		object-fit: cover;
	}

	.form-group {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.form-label {
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.form-control {
		display: block;
		width: 100%;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}

	.form-select {
		display: block;
		width: 100%;
		padding: 0.375rem 2.25rem 0.375rem 0.75rem;
		-moz-padding-start: calc(0.75rem - 3px);
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
		background-repeat: no-repeat;
		background-position: right 0.75rem center;
		background-size: 16px 12px;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	.submit-button {
		border-radius: 5px; /* adjust the value as needed */
		padding: 8px 20px;
		background-color: #70a9c4;
		color: #fff;
		border: none;
		font-size: 16px;
		cursor: pointer;
		transition: transform 0.2s ease-in-out; /* add transition property */
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
		width: 100%;
	}

	.form-count {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.form-count button {
		width: 10%;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}

	.form-count .form-control {
		text-align: center;
	}
</style>
