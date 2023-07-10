<style lang="postcss">
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
  }
</style>

<script lang="ts">
  export let value: string
  export let selectedTag: string

  const tags = (value || '').split(',').filter(Boolean)
</script>

{#if tags.length}
  <div class="tags">
    {#each tags as tag (tag)}
      <button
        class="btn tags__tag"
        on:click="{() => {
          selectedTag = tag
        }}"
        type="button"
      >
        {tag}
      </button>
    {/each}
  </div>
{/if}
