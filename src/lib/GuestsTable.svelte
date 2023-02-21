<script>
	import { onMount } from 'svelte';
	import supabase from './supabaseClient';

	/**
	 * @type {any[] | null}
	 */
	let guests;

	async function getGuestData() {
		try {
			let { data, error } = await supabase
				.from('guestpresent')
				.select('*')
				.order('id', { ascending: false });
			guests = data;
		} catch (error) {
			console.log(error);
		}
	}

	supabase
		.channel('greeting')
		.on('broadcast', { event: 'supa' }, (payload) => {
			getGuestData();
		})
		.subscribe();

	onMount(() => {
		getGuestData();
	});
</script>

<div class="guests">
	<div class="container">
		<div class="head">
			<div class="info check-in">Check-in <br /> <span>{guests?.length || 0}</span></div>
			<!-- <div class="info in-transit">In Transit <br /> <span>150</span></div> -->
		</div>
		<table class="content-table">
			<thead>
				<tr>
					<th>No</th>
					<th>Nama</th>
					<th>Type</th>
					<th>Total Tamu</th>
					<th>Jam Kehadiran</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if guests}
					{#each guests as guest, index}
						<tr>
							<td>{index + 1}</td>
							<td>{guest.name}</td>
							<td>{guest.type}</td>
							<td>{guest.total_guest}</td>
							<td>{guest.created_at}</td>
							<td />
						</tr>
					{:else}
						<p>Loading Data</p>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style>
	.guests {
		width: 100%;
		padding: 3rem;
	}

	.container {
		background-color: whitesmoke;
		padding: 1rem;
		border-radius: 12px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	}

	.head {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 1rem;
	}

	.head .info {
		padding: 1rem;
		padding-inline-end: 3rem;
		border-radius: 10px;
	}

	.head .info span {
		font-size: x-large;
		font-weight: bold;
	}

	.head .check-in {
		background-color: rgba(0, 128, 0, 0.116);
		color: green;
	}
	/* .head .in-transit {
		background-color: rgba(65, 105, 225, 0.37);
		color: blue;
	} */

	.content-table {
		border-collapse: collapse;
		margin: 25px 0;
		width: 100%;
		border-radius: 5px 5px 0 0;
		overflow: hidden;
	}

	.content-table thead tr {
		background-color: #70a9c4;
		color: whitesmoke;
		text-align: left;
		font-weight: bold;
		text-transform: uppercase;
	}

	.content-table th,
	.content-table td {
		padding: 12px 15px;
	}

	.content-table tbody tr {
		border-bottom: 1px solid #dddddd;
	}

	.content-table tbody tr:nth-of-type(even) {
		background-color: #eeeeee;
	}

	.content-table tbody tr:last-of-type {
		border-bottom: 2px solid #70a9c4;
	}
</style>
