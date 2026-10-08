<script lang="ts">
	type Stage = 'idle' | 'busy' | 'done';

	const LABELS: Record<Stage, string> = {
		idle: 'Download',
		busy: 'Downloading…',
		done: 'Downloaded'
	};

	/** A process: the button carries its stage as `data-state`, and the icon follows it. */
	let stage = $state<Stage>('idle');

	// Pretend work: busy for two seconds, done for two more, then ready again.
	async function download() {
		stage = 'busy';
		await wait(2000);
		stage = 'done';
		await wait(2000);
		stage = 'idle';
	}

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<button
	type="button"
	class="button"
	data-state={stage}
	disabled={stage !== 'idle'}
	onclick={download}
>
	<lord-icon
		src="/icons/download.json"
		trigger="follow(data-state, busy=loop-cycle, done=morph-check)"
		target="button"
		current-color
	></lord-icon>
	{LABELS[stage]}
</button>
