<script>
	import supabase from '../../lib/supabaseClient';

	/**
	 * @type {{ [key: string]: any; type: "broadcast"; event: string; }}
	 */
	let data;

	supabase
		.channel('greeting')
		.on('broadcast', { event: 'supa' }, (payload) => (data = payload))
		.subscribe();
</script>

<div>
	{#if data}
		<h1>{data.payload.name}</h1>
	{/if}
</div>
