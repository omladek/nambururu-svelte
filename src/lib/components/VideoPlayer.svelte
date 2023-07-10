<style lang="postcss">
  .thumbnail-wrap--video {
    aspect-ratio: var(--ar-width) / var(--ar-height);
    position: relative;

    & .thumbnail--video,
    & .thumbnail__bg {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    & .thumbnail__bg {
      background-color: var(--color-accent);
    }
  }

  .thumbnail-wrap--video video {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  .audio {
    width: 100%;
  }

  @media (prefers-color-scheme: dark) {
    .audio {
      opacity: 0.5;
    }
  }

  video:-webkit-media-controls-volume-slider {
    display: none;
  }

  video::-webkit-media-controls-mute-button {
    display: none;
  }

  video::-webkit-media-controls-volume-slider-container {
    display: none;
  }
</style>

<script lang="ts">
  import syncMediaPlayback from '../utilities/syncMediaPlayback'

  export let url: string
  export let height: number
  export let width: number
  export let hasAudio: boolean
  export let poster: string
  export let posterLoading: 'lazy' | 'eager'

  const audioUrl = url.replace(/_\d+/, '_audio')

  const style = `--ar-width: ${width};--ar-height: ${height}`

  const preload = posterLoading === 'lazy' ? 'none' : 'preload'

  let video: HTMLVideoElement
  let audio: HTMLAudioElement

  $: isLoaded = false

  $: {
    if (isLoaded) {
      if (video && audio) {
        syncMediaPlayback(video, audio)
      }

      if (video) {
        video.play()
      }

      if (audio) {
        audio.play()
      }
    }
  }
</script>

<div class="thumbnail-wrap thumbnail-wrap--video" style="{style}">
  {#if isLoaded}
    <video
      poster="{poster}"
      preload="{preload}"
      controls
      height="{height}"
      muted
      playsInline
      width="{width}"
      bind:this="{video}"
    >
      <source src="{url}" type="video/mp4" />
    </video>
    {#if hasAudio}
      <audio
        bind:this="{audio}"
        class="audio"
        controls
        muted
        preload="{preload}"
        src="{audioUrl}"></audio>
    {/if}
  {:else}
    <button
      aria-label="play video"
      class="thumbnail__btn"
      on:click="{() => {
        isLoaded = true
      }}"
      type="button"
    >
      ▶
    </button>

    {#if poster}
      <img
        alt=""
        class="thumbnail thumbnail--video"
        decoding="async"
        height="{height}"
        loading="{posterLoading}"
        src="{poster}"
        width="{width}"
      />
    {:else}
      <div class="thumbnail__bg"></div>
    {/if}
  {/if}
</div>
