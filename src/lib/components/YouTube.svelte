<style lang="postcss">
  .youtube {
    aspect-ratio: var(--ar-width, 16) / var(--ar-height, 9);
    display: block;
    position: relative;
  }

  .youtube__logo {
    background-color: var(--color-background);
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .youtube__thumbnail {
    background-color: var(--color-accent);
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  @media (prefers-color-scheme: dark) {
    .youtube__logo {
      background-color: var(--color-link);
      filter: grayscale(100%);
    }
  }
</style>

<script lang="ts">
  export let width: number
  export let height: number
  export let id: string
  export let thumbnail: string
  export let posterLoading: 'lazy' | 'eager'

  const style = `--ar-width: ${width};--ar-height: ${height}`
</script>

<a
  class="youtube"
  href="{`https://www.youtube.com/watch?v=${id}`}"
  rel="noopener noreferrer"
  style="{style}"
  target="_blank"
>
  <img
    alt=""
    class="youtube__logo"
    decoding="async"
    height="60"
    loading="{posterLoading}"
    srcSet="https://satyr.dev/80x60/FF0000?brand=youtube 1x, https://satyr.dev/160x120/FF0000?brand=youtube 2x"
    width="80"
  />
  <img
    alt=""
    class="youtube__thumbnail"
    decoding="async"
    height="{height}"
    loading="{posterLoading}"
    src="{thumbnail}"
    width="{width}"
  />
</a>
