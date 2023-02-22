<script>
	import { onMount } from 'svelte';
	import supabase from './supabaseClient';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiMonitor from 'svelte-icons-pack/fi/FiMonitor';
	import FiEdit from 'svelte-icons-pack/fi/FiEdit';
	import AiFillDelete from 'svelte-icons-pack/ai/AiFillDelete';
	import FaSolidTimes from 'svelte-icons-pack/fa/FaSolidTimes';
	import moment from 'moment';
	import data from './GuestData';

	/**
	 * @type {any[] | null}
	 */
	export let guests;

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

	const formatedDate = (/** @type {moment.MomentInput} */ created_at) => {
		let unix = moment.utc(created_at, 'YYYY-MM-DD HH:mm:ss.SSSSSSZ').unix() * 1000;
		return moment(unix).format('YYYY-MM-DD HH:mm:ss');
	};

	const sendTogreeting = (/** @type {any} */ data) => {
		const channel = supabase.channel('greeting').subscribe((status) => {
			if (status === 'SUBSCRIBED') {
				channel.send({
					type: 'broadcast',
					event: 'supa',
					payload: data
				});
			}
		});
	};
	let openModalEdit = false;
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
	let total_guest;
	/**
	 * @type {any}
	 */
	let id;

	let modalDelete = false;
	const editGuest = (/** @type {any} */ data) => {
		openModalEdit = true;
		name = data.name;
		description = data.description;
		type = data.type;
		total_guest = data.total_guest;
		id = data.id;
	};

	async function updateGuest() {
		try {
			const { data, error } = await supabase
				.from('guestpresent')
				.update([
					{
						name,
						description,
						type,
						total_guest
					}
				])
				.match({ id: id })
				.select();
			if (data) {
				getGuestData();
				openModalEdit = false;
			}
		} catch (error) {
			console.log(error);
		}
	}
	/**
	 * @type {any}
	 */
	let idDelete;
	/**
	 * @type {any}
	 */
	let guestDelete;
	const handleModalDelete = (/** @type {{ id: any; name: any; }} */ data) => {
		modalDelete = true;
		idDelete = data.id;
		guestDelete = data.name;
	};

	const deleteId = async () => {
		try {
			const { data, error } = await supabase
				.from('guestpresent')
				.delete()
				.eq('id', idDelete)
				.select();
			if (data) {
				getGuestData();
				modalDelete = false;
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="guests">
	<div class="container">
		<div class="head">
			<div class="info check-in">Check-in <br /> <span>{guests?.length || 0}</span></div>
			<!-- <div class="info in-transit">In Transit <br /> <span>150</span></div> -->
		</div>
		<div class="table-container">
			<table class="content-table">
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Type</th>
						<th>Total Guest</th>
						<th>Check-in</th>
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
								<td>{formatedDate(guest.created_at)}</td>
								<td class="action">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div class="icon" on:click={sendTogreeting(guests[index])}>
										<Icon src={FiMonitor} color="green" />
									</div>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div class="icon" on:click={editGuest(guests[index])}>
										<Icon src={FiEdit} color="blue" />
									</div>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div class="icon" on:click={handleModalDelete(guests[index])}>
										<Icon src={AiFillDelete} color="red" />
									</div>
								</td>
							</tr>
						{:else}
							<div style="width: 100%; margin-top: 1rem;">
								<p style="text-align: center;">
									No Guest record, click add guest button or scan check-in access card
								</p>
							</div>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
		{#if openModalEdit}
			<div class="editGuestModal">
				<div class="wrapper">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="close" on:click={() => (openModalEdit = false)}>
						<Icon src={FaSolidTimes} color="whitesmoke" />
					</div>
					<div class="title">Edit Guest</div>
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
					<button class="save-guest" on:click={updateGuest}>Submit</button>
				</div>
			</div>
		{/if}
		{#if modalDelete}
			<div class="modal-delete">
				<div class="content">
					<p>Are you sure want to delete this guest ?</p>
					<h5>{guestDelete}</h5>
					<div class="button">
						<button class="cancel" on:click={() => (modalDelete = false)}>Cancel</button>
						<button class="delete" on:click={deleteId}>Delete</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.modal-delete {
		position: fixed;
		height: 100vh;
		width: 100%;
		top: 0;
		left: 0;
		background-color: #1d292e6b;
		display: grid;
		place-items: center;
	}

	.modal-delete .content {
		background-color: whitesmoke;
		padding: 1rem;
		border-radius: 12px;
		text-align: center;
	}

	.modal-delete .content p {
		font-size: 2rem;
	}

	.modal-delete .content h5 {
		margin-bottom: 2rem;
	}

	.modal-delete .button {
		display: flex;
		gap: 1rem;
	}

	.modal-delete .content .cancel {
		border-radius: 5px; /* adjust the value as needed */
		padding: 8px 20px;
		background-color: #646464;
		color: #fff;
		border: none;
		font-size: 16px;
		cursor: pointer;
		transition: transform 0.2s ease-in-out; /* add transition property */
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
		width: 100%;
	}

	.modal-delete .content .delete {
		border-radius: 5px; /* adjust the value as needed */
		padding: 8px 20px;
		background-color: #ad2929;
		color: #fff;
		border: none;
		font-size: 16px;
		cursor: pointer;
		transition: transform 0.2s ease-in-out; /* add transition property */
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
		width: 100%;
	}

	.editGuestModal {
		position: fixed;
		height: 100vh;
		width: 100%;
		top: 0;
		left: 0;
		background-color: #222d316e;
		display: grid;
		place-items: center;
	}

	.editGuestModal .wrapper {
		background-color: whitesmoke;
		padding: 1rem;
		border-radius: 12px;
		width: 50%;
		position: relative;
	}

	.editGuestModal .wrapper .close {
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

	.editGuestModal .wrapper .title {
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
	.action {
		display: flex;
		justify-content: start;
		align-items: flex-start;
		gap: 1rem;
	}

	.icon {
		cursor: pointer;
	}

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

	.table-container {
		max-height: 600px;
		overflow: hidden;
		overflow-y: scroll;
		border-bottom: 2px solid #70a9c4;
	}

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
</style>
