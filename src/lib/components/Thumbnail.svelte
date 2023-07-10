<style lang="postcss">
  .thumbnail-wrap {
    position: relative;
  }

  .thumbnail {
    background-color: var(--color-accent);
    height: auto;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .thumbnail__link {
    aspect-ratio: var(--ar-width, 16) / var(--ar-height, 9);
    display: block;
    position: relative;
  }

  :global(.thumbnail__btn) {
    background: none;
    border: 0;
    color: var(--color-background);
    font-size: 5rem;
    height: 100%;
    left: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  @media (prefers-color-scheme: dark) {
    :global(.thumbnail__btn) {
      color: var(--color-text);
    }
  }

  :global(.thumbnail__hd) {
    background-color: var(--color-post);
    color: var(--color-text);
    display: block;
    font-size: 0.75rem;
    padding-inline: 0.5em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
</style>

<!-- @hmr:keep-all -->

<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements'

  export let fullSize = ''
  export let height: number
  export let loading: 'lazy' | 'eager' = 'lazy'
  export let retina = ''
  export let thumbnail: string
  export let width: number

  $: showFullSize = !fullSize

  $: srcSetSD = showFullSize && fullSize ? fullSize : thumbnail
  $: srcSetHD = showFullSize && fullSize ? fullSize : retina

  $: {
    if (!retina) {
      srcSetHD = ''
    } else {
      srcSetHD = `, ${srcSetHD} 2x`
    }
  }

  const style = `--ar-width: ${width};--ar-height: ${height}`

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (fullSize && !showFullSize) {
      event.preventDefault()

      showFullSize = !showFullSize
    }
  }
</script>

<div class="thumbnail-wrap">
  <a
    class="thumbnail__link"
    href="{fullSize || thumbnail}"
    rel="noopener noreferrer"
    on:click="{handleClick}"
    style="{style}"
    target="_blank"
  >
    {#if fullSize}
      <span class="thumbnail__hd">
        {#if showFullSize}
          HD
        {:else}
          SD
        {/if}
      </span>
    {/if}
    <img
      alt=""
      class="thumbnail"
      decoding="async"
      height="{height}"
      loading="{loading}"
      srcSet="{`${srcSetSD} 1x${srcSetHD}`}"
      width="{width}"
    />
  </a>
</div>
