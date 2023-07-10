<style lang="postcss">
  .post-link {
    align-items: center;
    aspect-ratio: 16/9;
    background-color: var(--color-accent);
    display: flex;
    height: auto;
    justify-content: center;
    padding: var(--gutter);
    width: 100%;
    word-break: break-all;
  }

  @media (prefers-color-scheme: dark) {
    .post-link__logo {
      filter: grayscale(100%);
    }
  }

  .post-link__logo {
    aspect-ratio: 1/1;
    object-fit: contain;
    width: 5em;
  }
</style>

<script lang="ts">
  import type { NormalizedPostMedia } from '../types/reddit-api/ThreadsResult.type'
  import Gallery from './Gallery.svelte'
  import Thumbnail from './Thumbnail.svelte'
  import VideoPlayer from './VideoPlayer.svelte'
  import YouTube from './YouTube.svelte'

  export let media: NormalizedPostMedia
  export let mediaLoading: 'lazy' | 'eager'
</script>

{#if media.type === 'normalizedVideo'}
  <VideoPlayer
    hasAudio="{media.hasAudio}"
    height="{media.height}"
    poster="{media.poster}"
    posterLoading="{mediaLoading}"
    url="{media.url}"
    width="{media.width}"
  />
{:else if media.type === 'singleImage'}
  <Thumbnail
    fullSize="{media.fullSize || undefined}"
    height="{media.height}"
    loading="{mediaLoading}"
    retina="{media.retina}"
    thumbnail="{media.thumbnail}"
    width="{media.width}"
  />
{:else if media.type === 'gallery'}
  <Gallery items="{media.items}" mediaLoading="{mediaLoading}" />
{:else if media.type === 'youtube'}
  <YouTube
    height="{media.height}"
    id="{media.id}"
    posterLoading="{mediaLoading}"
    thumbnail="{media.thumbnail}"
    width="{media.width}"
  />
{:else if media.type === 'externalLink'}
  <a
    class="post-link"
    href="{media.url}"
    rel="noopener noreferrer"
    target="_blank"
  >
    <img
      alt=""
      class="post-link__logo"
      decoding="async"
      height="50"
      loading="{mediaLoading}"
      src="{media.image}"
      width="50"
    />
  </a>
{:else if media.type === 'thumbnail'}
  <Thumbnail
    height="{media.height}"
    loading="{mediaLoading}"
    thumbnail="{media.url}"
    width="{media.width}"
  />
{:else if media.type === 'previewImage'}
  <Thumbnail
    height="{media.height}"
    loading="{mediaLoading}"
    thumbnail="{media.url}"
    width="{media.width}"
  />
{/if}
