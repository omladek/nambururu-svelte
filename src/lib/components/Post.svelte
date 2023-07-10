<style lang="postcss">
  .post {
    background-color: var(--color-post);
    border-bottom: 1px solid var(--color-accent);
    overflow: hidden;
    padding-block-end: var(--gutter);
    position: relative;
  }

  :global(.post:empty) {
    min-height: var(--minHeight, 500px);
  }

  .post.is-lazy {
    opacity: 1;
    transform: translateZ(0);
    transition: opacity 300ms ease-out;
  }

  @media (prefers-reduced-motion) {
    .post.is-lazy {
      transition: none;
    }
  }

  .post.is-lazy:empty {
    opacity: 0;
  }

  .post__info {
    padding-block-start: var(--gutter);
    padding-inline: var(--gutter);
  }

  .post__subreddit-link {
    display: block;
    font-size: 90%;
    text-decoration: none;
  }

  @media (min-width: 40em) {
    .post__subreddit-link {
      display: inline;
    }
  }

  .post__title {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    margin-block-end: var(--gutter);
  }

  .post__link {
    display: block;
    line-height: 1.3;
    text-decoration: none;
    word-break: break-word;
  }

  .post__description {
    max-height: 15rem;
    overflow: auto;
    width: 100%;
    word-break: break-word;

    & a {
      word-break: break-all;
    }
  }

  :global(.post__description pre) {
    overflow: auto;
  }

  .post__data {
    --spacing: 0.25rem;
    font-size: 80%;

    & dt,
    & dd {
      display: inline-block;
      margin: 0;
      padding: 0;
    }

    & dt {
      filter: grayscale(100%);
      padding-inline-end: var(--spacing);
    }

    & dd:first-of-type {
      display: block;
      margin-block-end: calc(var(--spacing) * 2);
    }

    & dd:not(:last-child) {
      margin-inline-end: calc(var(--spacing) * 2);
    }
  }

  @media (prefers-color-scheme: dark) {
    .post__description,
    .post__title {
      filter: grayscale(100%);
    }
  }

  .post__comments {
    padding-block-start: var(--gutter);

    & a {
      word-break: break-all;
    }
  }

  .post__domain {
    word-break: break-all;
  }
</style>

<!-- @hmr:keep-all -->

<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer'

  import type { NormalizedPost } from '../types/reddit-api/ThreadsResult.type'
  import Link from './Link.svelte'
  import Media from './Media.svelte'
  import CommentsPreview from './CommentsPreview.svelte'
  import RichText from './RichText.svelte'

  let element: HTMLDivElement

  export let post: NormalizedPost

  export let mediaLoading: 'lazy' | 'eager' = 'lazy'

  const {
    commentsTotalFormatted,
    createdDate,
    description,
    domain,
    downVotes,
    hasComments,
    permalink,
    subreddit,
    title,
    upVotes,
    media,
    id,
    externalLink,
  } = post

  $: isLoaded = mediaLoading === 'eager'
  $: showContent = mediaLoading === 'eager'

  $: hasMinHeight = false
</script>

<IntersectionObserver
  element="{element}"
  on:observe="{({ detail }) => {
    if (isLoaded && detail.isIntersecting && !hasMinHeight) {
      hasMinHeight = true
      element.style.setProperty(
        '--minHeight',
        `${Math.ceil(element.offsetHeight)}px`,
      )
    }

    if (detail.isIntersecting && !isLoaded) {
      isLoaded = true
    }

    if (detail.isIntersecting && isLoaded && !showContent) {
      showContent = true
    }

    if (!detail.isIntersecting && isLoaded && showContent) {
      showContent = false
    }
  }}"
>
  <article bind:this="{element}" class="{`post is-${mediaLoading}`}">
    {#if isLoaded && showContent}
      {#if media?.type}
        <Media media="{media}" mediaLoading="{mediaLoading}" />
      {/if}
      <div class="post__info">
        <h2 class="post__title">
          <a
            class="post__link"
            href="{permalink}"
            rel="noopener noreferrer"
            target="_blank"
          >
            {title}
          </a>
        </h2>

        {#if description}
          <div class="post__description">
            <RichText html="{description}" />
          </div>
        {/if}

        <dl class="post__data">
          <dt class="sr-only">date:</dt>

          <dd class="post__time">
            <time>{createdDate}</time>
          </dd>

          <dt class="sr-only">subreddit:</dt>

          <dd>
            <Link
              className="post__subreddit-link"
              href="{`/nambururu-svelte/#/?subreddit=${subreddit}&sort=best`}"
            >
              {`r/${subreddit}`}
            </Link>
          </dd>

          <dt>
            <span class="sr-only">domain:</span>
            <span aria-hidden>🌐</span>
          </dt>

          <dd class="post__domain">
            {#if externalLink}
              <a
                href="{externalLink}"
                rel="noopener noreferrer"
                target="_blank"
              >
                {domain}
              </a>
            {:else}
              {domain.replace(/^self./, '')}
            {/if}
          </dd>

          <dt>
            <span aria-hidden>💬</span>
            <span class="sr-only">comments:</span>
          </dt>

          <dd>{commentsTotalFormatted}</dd>

          <dt>
            <span aria-hidden>⬆️</span>
            <span class="sr-only">upvotes:</span>
          </dt>

          <dd>{upVotes}</dd>

          <dt>
            <span aria-hidden>⬇️</span>
            <span class="sr-only">downvotes:</span>
          </dt>

          <dd>{downVotes}</dd>
        </dl>

        {#if hasComments}
          <div class="post__comments">
            <CommentsPreview id="{id}" />
          </div>
        {/if}
      </div>
    {/if}
  </article>
</IntersectionObserver>
