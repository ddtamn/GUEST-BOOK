<script>
	import supabase from '../../lib/supabaseClient';

	supabase
		.channel('greeting')
		.on('broadcast', { event: 'supa' }, (payload) => console.log(payload))
		.subscribe();
</script>
