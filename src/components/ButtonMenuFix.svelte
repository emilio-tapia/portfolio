<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let state = false;
  export let className;

  function setSelected() {
    state = !state;
    console.log(state);

    const newValue = Number(state);

    dispatch('change', { value: newValue });
  }

  function handleClick() {
    alert('clicked');
  }
</script>

<button
  class={className}
  data-open={state ? 'open' : 'closed'}
  name={className}
  on:click={handleClick}
>
  <slot />
</button>
