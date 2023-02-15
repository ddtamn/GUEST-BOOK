<script>
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';
	// This method will trigger user permissions

  /**
	 * @type {string}
	 */
  let scanResult;
	onMount(() => {
		Html5Qrcode.getCameras()
			.then((devices) => {
				/**
				 * devices would be an array of objects of type:
				 * { id: "id", label: "label" }
				 */
				if (devices && devices.length) {
					var cameraId = devices[0].id;
					const html5Qrcode = new Html5Qrcode('reader', false);
					html5Qrcode.start(
						cameraId,
						{
							fps: 10, // Optional frame per seconds for qr code scanning
							qrbox: { width: 250, height: 250 } // Optional if you want bounded box UI
						},
						(decodedText, decodedResult) => {
							// do something when code is read
              scanResult = decodedText
							console.log(decodedText, decodedResult);
						},
						(errorMessage) => {
							// parse error, ideally ignore it.
							// console.log(errorMessage);
						}
					);
				}
			})
			.catch((err) => {
				// handle err
				console.log(err);
			});
	});
</script>

<div class="flex justify-center items-center w-full h-[100vh]">
	<div id="reader" class="w-full" />
  {#if scanResult}
    <p>{scanResult}</p>
  {/if}
</div>

