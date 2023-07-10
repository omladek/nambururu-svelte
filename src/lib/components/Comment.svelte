<style lang="postcss">
  .comment {
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-accent);
      margin-block-end: 0.5em;
    }
  }

  .comment__title {
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
    margin-block-end: 0.5em;
    padding: 0;
  }

  .comment__body {
    margin-block-end: 0.5em;
    overflow: auto;

    & a {
      word-break: break-all;
    }

    & p:last-child {
      margin-block-end: 0;
    }

    & img {
      height: auto;
      max-width: 100%;
      width: 100%;
    }
  }
</style>

<script lang="ts">
  import type { NormalizedComment } from '../types/reddit-api/CommentsResult.type'
  import RichText from './RichText.svelte'

  export let comment: NormalizedComment
</script>

<section class="comment">
  <h3 class="comment__title">
    {comment.voteResult} ({comment.upVotes})
  </h3>

  <div class="comment__body">
    <RichText html="{comment.text}" />
  </div>
</section>
