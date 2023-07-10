<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements'

  import Storage from '../lib/constants/storage'
  import getDefaultValue from '../lib/utilities/getDefaultValue'

  let isSaved = false
  $: blockedTitleKeywords = getDefaultValue(Storage.BLOCKED_TITLE_KEYWORDS)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event,
  ): Promise<void> => {
    event.preventDefault()

    isSaved = false

    const entries = [...new FormData(event.currentTarget).entries()]

    entries.forEach(([key, value]) => {
      localStorage.setItem(key, value.toString())
    })

    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 500)
    })

    isSaved = true
  }
</script>

<main class="main">
  <h1 class="title">Blocked title keywords</h1>
  <div class="block">
    <form action="" method="GET" on:submit="{handleSubmit}">
      <fieldset>
        <label for="{Storage.BLOCKED_TITLE_KEYWORDS}">
          blocked title keywords
        </label>
        <p>
          comma separated words; if a post title includes this word(s) it will
          not be shown
        </p>
        <textarea
          value="{blockedTitleKeywords}"
          id="{Storage.BLOCKED_TITLE_KEYWORDS}"
          name="{Storage.BLOCKED_TITLE_KEYWORDS}"
          on:change="{() => {
            isSaved = false
          }}"></textarea>
      </fieldset>

      <button class="btn" type="submit">Save</button>

      {#if isSaved}
        <p>Changes were saved.</p>
      {/if}
    </form>
  </div>
</main>
