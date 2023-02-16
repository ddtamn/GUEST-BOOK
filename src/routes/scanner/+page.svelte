<script>
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';



	/**
	 * @type {string | MediaTrackConstraints}
	 */
	 export let cameraId;

	 let showButtonStart = true


	const startScan = () => {
		const reader = new Html5Qrcode('reader', false);
		reader.start({facingMode : "environment"},
						{
							fps: 30, // Optional frame per seconds for qr code scanning
							// qrbox: { width: 250, height: 250 } // Optional if you want bounded box UI
						},
						(decodedText, decodedResult) => {
							// do something when code is read
							console.log(decodedText, decodedResult);
							alert(decodedText);
						},
						(errorMessage) => {
							// parse error, ideally ignore it.
							// console.log(errorMessage);
						});
		showButtonStart = false
	}

	

	onMount(() => {
		Html5Qrcode.getCameras().then((devices) => {
			if (devices && devices.length) {
				cameraId = devices[0].id
			}
		})
	}) 
</script>

<div class="container">
	<div id="reader" />
	{#if showButtonStart}
	<button on:click={startScan}>Start Scan</button>
	{/if}
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
	}
</style>
