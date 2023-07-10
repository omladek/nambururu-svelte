<style lang="postcss">
  .gallery {
    display: grid;
    gap: var(--gutter);
    grid-template-columns: 1fr;
  }
</style>

<script lang="ts">
  import type { NormalizedGalleryImage } from '../types/reddit-api/ThreadsResult.type'
  import Thumbnail from './Thumbnail.svelte'

  export let items: NormalizedGalleryImage[]
  export let mediaLoading: 'lazy' | 'eager'
</script>

{#if items.length}
  <div class="gallery">
    {#each items as thumbnail, thumbnailIndex (thumbnail.thumbnail)}
      <Thumbnail
        fullSize="{thumbnail.fullSize}"
        height="{thumbnail.height}"
        loading="{thumbnailIndex < 1 ? mediaLoading : 'lazy'}"
        retina="{thumbnail.retina}"
        thumbnail="{thumbnail.thumbnail}"
        width="{thumbnail.width}"
      />
    {/each}
  </div>
{/if}
