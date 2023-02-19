<script>
	import supabase from '../../lib/supabaseClient';
	import { fly } from 'svelte/transition';

	/**
	 * @type {{ [key: string]: any; type: "broadcast"; event: string; }}
	 */
	let data;

	let showGreeting = false;

	supabase
		.channel('greeting')
		.on('broadcast', { event: 'supa' }, (payload) => (data = payload))
		.subscribe();
</script>

<div class="container">
	<div class="image">
		<img src="https://dinvite.online/themes/assets/demo/preview12/4.jpg" alt="" />
	</div>
	<div class="content">
		<p class="head">Welcome to <br /> The Weddding of</p>
		<p class="title">Randhya & Ririn</p>
		<div class="description">
			<p class="date">Kamis, 23 Februari 2023</p>
			<p class="place">Estrella Hotel & Conference Center - Luwuk</p>
			<!-- <button on:click={() => (showGreeting = true)}>tes</button> -->
		</div>
	</div>
	{#if showGreeting}
		<div class="greeting-card" transition:fly={{ duration: 1000 }}>
			<div class="wrapper">
				<p>Selamat Datang</p>
				<h2>I MADE BAGUS ADITYA M., S.T.K., S.I.K., M.A.I.C.</h2>
				<h6>KASAT LANTAS</h6>
				<!-- <button on:click={() => (showGreeting = false)}>close</button> -->
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		height: 100vh;
		background-image: url('https://dinvite.online/themes/elegant-brown-leaves/images/bg-v2.jpg');
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;

		display: flex;
		justify-content: center;
		/* align-items: center; */
	}

	.image,
	.content {
		width: 50%;
		max-height: 100%;
		overflow: hidden;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content {
		background-color: #e6d7c1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		gap: 2rem;
	}

	.head {
		font-size: 3rem;
		color: #8f610d;
	}

	.title {
		font-family: Alex Brush, cursive;
		font-weight: bold;
		font-size: 10rem;
		color: #7e4802;
		/* margin-top: 4rem; */
	}

	.description {
		font-size: 1.5rem;
		color: #7e2502;
	}

	.greeting-card {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #2c282675;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrapper {
		background-color: #e6d7c1;
		width: 95%;
		height: 95%;
		border-radius: 20px;
		padding: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
		gap: 3rem;
	}

	.wrapper p {
		font-size: 3rem;
		color: #8f610d;
	}

	.wrapper h2 {
		font-size: 8rem;
		color: #7e4802;
	}

	.wrapper h6 {
		font-size: 2rem;
		color: #7e2502;
	}
</style>
