<script>
	import GuestsTable from '../lib/GuestsTable.svelte';
	import * as XLSX from 'xlsx';
	import supabase from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaSolidTimes from 'svelte-icons-pack/fa/FaSolidTimes';

	/**
	 * @type {any[]}
	 */
	let guest_data;

	async function getData() {
		try {
			let { data, error } = await supabase
				.from('guestpresent')
				.select('*')
				.order('id', { ascending: false });
			if (data) {
				guest_data = data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	onMount(() => {
		getData();
	});

	async function exportToExcel() {
		if (guest_data.length > 1) {
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.json_to_sheet(guest_data);
			XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
			XLSX.writeFile(wb, 'GUESTBOOK DIGITAL RANDHYA & RIRIN.xlsx');
		}
	}

	let openModal = false;
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
	let type = 'OFFLINE GUEST';
	/**
	 * @type {any}
	 */
	let total_guest = 1;

	async function addGuest() {
		if (name) {
			try {
				let { data, error } = await supabase
					.from('guestpresent')
					.insert([
						{
							name,
							description,
							type,
							total_guest
						}
					])
					.select();
				if (data) {
					getData();
					openModal = false;
					name = '';
					description = '';
					type = 'OFFLINE GUEST';
					total_guest = 1;
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			alert('required field name');
		}
	}
</script>

<main>
	<div class="header">
		<h1>Digital Guest Book</h1>
		<div class="profile">
			<img
				src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
				alt=""
			/>
			<p>Admin</p>
		</div>
	</div>
	<div class="container">
		<div class="menu">
			<button on:click={() => (openModal = true)}>Add Guest</button>
			<button on:click={exportToExcel}>Export to Excel</button>
			<button>Export to PDF</button>
		</div>
		<GuestsTable guests={guest_data} />
		{#if openModal}
			<div class="addGuestModal">
				<div class="wrapper">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="close" on:click={() => (openModal = false)}>
						<Icon src={FaSolidTimes} color="whitesmoke" />
					</div>
					<div class="title">Add Guest</div>
					<div class="form-group">
						<label class="form-label" for="name">Name</label>
						<input type="text" bind:value={name} class="form-control" />
					</div>
					<div class="form-group">
						<label class="form-label" for="description">Description</label>
						<input type="text" bind:value={description} class="form-control" />
					</div>
					<div class="form-group">
						<label class="form-label" for="type">Type</label>
						<input type="text" bind:value={type} class="form-control" />
					</div>
					<div class="form-group">
						<label class="form-label" for="type">Total Guest</label>
						<input type="number" bind:value={total_guest} class="form-control" />
					</div>
					<button class="save-guest" on:click={addGuest}>Submit</button>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	.addGuestModal {
		position: fixed;
		height: 100vh;
		width: 100%;
		top: 0;
		left: 0;
		background-color: #222d316e;
		display: grid;
		place-items: center;
	}

	.addGuestModal .wrapper {
		background-color: whitesmoke;
		padding: 1rem;
		border-radius: 12px;
		width: 50%;
		position: relative;
	}

	.addGuestModal .wrapper .close {
		position: absolute;
		width: 30px;
		height: 30px;
		border-radius: 100%;
		top: -1rem;
		right: -1rem;
		display: grid;
		place-items: center;
		cursor: pointer;
		background-color: #70a9c4;
	}

	.addGuestModal .wrapper .title {
		text-align: center;
		font-weight: bold;
		font-size: 2rem;
		text-transform: uppercase;
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

	.save-guest {
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

	.header {
		position: fixed;
		top: 0;
		left: 0;
		background-color: whitesmoke;
		width: 100%;
		height: 4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 2.5rem;
	}

	.profile {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.profile img {
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: 100%;
	}

	.container {
		margin-top: 7rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.menu {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.menu button {
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

	.menu button:hover {
		transform: scale(1.1); /* add hover scale animation */
	}
</style>
