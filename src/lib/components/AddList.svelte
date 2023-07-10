<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements'
  import getSanitizedString from '../utilities/getSanitizedString'

  export let listId: string
  export let lists: string[]

  const inputId = 'list-name'

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const listName = getSanitizedString(
      (new FormData(event.currentTarget).get(inputId)?.toString() || '').trim(),
    )

    if (!listName) {
      return
    }

    const isExisting = lists.includes(listName)

    if (isExisting) {
      // eslint-disable-next-line no-alert
      alert(
        `List "${listName}" already exists! Please choose a different name.`,
      )
      return
    }

    listId = listName
  }
</script>

<form action="" method="GET" on:submit="{handleSubmit}">
  <fieldset>
    <legend>Create new list</legend>
    <label for="{inputId}">Name</label>
    <input
      autoComplete="off"
      id="{inputId}"
      maxLength="{38}"
      name="{inputId}"
      pattern="[a-zA-Z0-9_\-]+"
      required
      type="text"
    />
    <p>
      <small>Allowed: letters, numbers, underscore, hyphen</small>
    </p>
    <button class="btn" type="submit">Create</button>
  </fieldset>
</form>
