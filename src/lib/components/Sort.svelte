<script lang="ts">
  import type { SortOption } from '../constants/sortOptions'
  import sortOptions from '../constants/sortOptions'

  export let value: SortOption

  interface FormEventHandler<T> {
    currentTarget: T
  }

  const handleChange = ({
    currentTarget,
  }: FormEventHandler<HTMLSelectElement>) => {
    value = currentTarget.value as SortOption
  }
</script>

<form action="" method="GET">
  <fieldset>
    <label for="sort">sort</label>
    <select value="{value}" id="sort" name="sort" on:change="{handleChange}">
      <option disabled>choose</option>
      {#if sortOptions.length}
        {#each sortOptions as sortOption (sortOption)}
          <option value="{sortOption}">
            {sortOption}
          </option>
        {/each}
      {/if}
    </select>
  </fieldset>
</form>
