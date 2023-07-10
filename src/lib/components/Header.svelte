<style lang="postcss">
  .header {
    align-items: center;
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-accent);
    display: flex;
    justify-content: space-between;
    padding-inline: var(--gutter);
  }

  :global(.header__logo) {
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
  }

  .header__nav {
    width: 100%;
  }

  .header__nav-list {
    align-items: center;
    display: flex;
    gap: var(--gutter);
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .header__nav-list-item:first-child {
    flex: 1;
  }

  :global(.header__nav-list-item-link) {
    display: block;
    padding-block: calc(var(--gutter) / 2);
    padding-inline: var(--gutter);
  }

  :global(.header__nav-list-item-link.is-active) {
    background-color: var(--color-accent);
    text-decoration: none;
  }
</style>

<script lang="ts">
  import Link from './Link.svelte'
</script>

<header class="header">
  <nav class="header__nav">
    <ul class="header__nav-list">
      <li class="header__nav-list-item">
        <Link className="header__logo" href="/nambururu-svelte/#/"
          >Nambururu</Link
        >
      </li>
      <li class="header__nav-list-item">
        <Link
          activeClassName="is-active"
          className="header__nav-list-item-link"
          href="/nambururu-svelte/#/"
        >
          Home
        </Link>
      </li>
      <li class="header__nav-list-item">
        <Link
          activeClassName="is-active"
          className="header__nav-list-item-link"
          href="/nambururu-svelte/#/settings"
        >
          Settings
        </Link>
      </li>
    </ul>
  </nav>
</header>
