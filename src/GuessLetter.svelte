<script>
	export let value;
	export let disabled = true;
	export let autofocus = false;
	export let name;
</script>

<input
	class="border border-zinc-50 bg-transparent w-1/5 p-1 text-center"
	maxlength="1"
	bind:value
	{disabled}
	{autofocus}
	{name}
/>
