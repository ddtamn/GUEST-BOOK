<script>
	import supabase from '../../lib/supabaseClient';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import moment from 'moment';

	/**
	 * @type {{ [key: string]: any; type: "broadcast"; event: string; }}
	 */
	let data;

	let showGreeting = false;
	let showComment = false;
	supabase
		.channel('greeting')
		.on(
			'broadcast',
			{ event: 'supa' },
			(payload) => (
				(data = payload),
				(showGreeting = false),
				setTimeout(() => {
					showGreeting = true;
				}, 1000),
				setTimeout(() => {
					showGreeting = false;
				}, 8000)
			)
		)
		.subscribe();

	/**
	 * @type {any}
	 */
	let name;
	/**
	 * @type {any}
	 */
	let comment;
	/**
	 * @type {any}
	 */
	let created_at;
	async function notify() {
		try {
			let { data, error } = await supabase
				.from('comments')
				.select('*')
				.order('id', { ascending: false });
			if (data) {
				let i = 0;
				setInterval(() => {
					showComment = false;
					setTimeout(() => {
						showComment = true;
						// @ts-ignore
						name = data[i].name;
						// @ts-ignore
						comment = data[i].comment;
						// @ts-ignore
						created_at = data[i].created_at;
						i++;
					}, 3000);
					if (i === data?.length) {
						i = 0;
					}
				}, 10000);
			}
		} catch (error) {
			console.log(error);
		}
	}

	onMount(() => {
		notify();
	});

	console.clear();
</script>

<div class="container">
	<div class="image">
		<img src="/KTN07436.jpg" alt="" />
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
	{#if showGreeting && data}
		<div class="greeting-card" transition:fly={{ duration: 1000 }}>
			<div class="wrapper">
				<p>Selamat Datang</p>
				<h2>{data.payload.name}</h2>
				<h6>{data.payload.description || ''}</h6>
				<!-- <button on:click={() => (showGreeting = false)}>close</button> -->
			</div>
		</div>
	{/if}
	<div class="comment {showComment ? 'show' : ''}">
		<h4>{name}</h4>
		<p>
			{comment}
		</p>
		<i>{moment(created_at).fromNow()}</i>
	</div>
	<div class="footer">
		<p class="online">Online</p>
		<!-- <h4>https://randhyaririn.online</h4> -->
		<div class="logo">
			<div class="photo">
				<p>Photo by :</p>
				<p class="katanadi">Katanadi</p>
			</div>
			<div class="wo">
				<p>Organized by :</p>
				<img src="/rustic.jpeg" alt="">
				<p>Rustic Wedding Organizer</p>
			</div>
			<div class="dinvite">
				<p>Powered by</p>
				<img src="/favicon.png" alt="" />
				<p>Dinvite</p>
			</div>
			
		</div>
	</div>
</div>

<style>
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #202020;
		height: 2.5rem;
		width: 100%;
		padding-inline: 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: whitesmoke;
	}

	.footer .logo {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 3rem;

	}

	.footer .logo img {
		width: 20px;
		margin-left: 1rem;
		margin-right: 0.3rem;
		border-radius: 3px;
		object-fit: cover;
	}
	
	.footer .logo .wo, .footer .logo .dinvite, .footer .logo .photo {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer .online {
		font-weight: bold;
		position: relative;
	}

	.footer .katanadi {
		font-family: "Great Vibes", cursive;
		margin-left: 1rem;
		font-size: 1.5rem;
	}

	.footer .online::before {
		content: '';
		position: absolute;
		width: 13px;
		background-color: rgb(0, 168, 0);
		height: 13px;
		left: -1.3rem;
		bottom: 5px;
		border-radius: 100%;
	}

	.comment {
		position: fixed;
		background-color: #e6d7c1;
		padding: 1rem;
		padding-inline: 2rem;
		border-radius: 12px;
		bottom: 5rem;
		left: 2rem;
		max-width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		text-align: left;
		gap: 1rem;
		transform: translateX(-110%);
		opacity: 0;
		transition: all 0.3s ease-in-out;
	}

	.comment.show {
		transform: translateX(0);
		opacity: 1;
	}

	.comment h4 {
		color: #7e2502;
		font-size: 1.5rem;
	}

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
		z-index: 999;
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
