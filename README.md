# svelte-url-store-manager

A lightweight Svelte package that synchronizes your store data with URL parameters, enabling seamless state persistence and sharing through URLs.

## Features

- 🔄 Two-way binding between Svelte stores and URL parameters
- 🗜️ Automatic compression of state data using LZ-String
- 📱 SvelteKit compatible
- 🔍 Debug mode for development
- 🔀 Handles route changes gracefully
- 🔗 Easy state sharing via URLs

## Installation

```bash
npm install svelte-url-store-manager
```

## Usage

1. Import the URLStore component:
```svelte
import { URLStore } from 'svelte-url-store-manager';
```

2. Bind it to your store:
```svelte
<script>
  import { writable } from 'svelte/store';
  
  const myStore = writable({
    // your store data
  });
</script>

<URLStore bind:data={$myStore} />
```

### Debug Mode

Enable debug mode to see detailed logs in the console:

```svelte
<URLStore bind:data={$myStore} debug={true} />
```

## How It Works

The package automatically:
1. Compresses your store data using LZ-String compression
2. Stores the compressed data in the URL parameter `_z`
3. Syncs URL parameters across route changes
4. Decompresses and updates store data when URL parameters change

## Example

```svelte
<script>
  import { writable } from 'svelte/store';
  import { URLStore } from 'svelte-url-store-manager';

  const formStore = writable({
    name: '',
    email: '',
    preferences: {}
  });
</script>

<URLStore bind:data={$formStore} />

<form>
  <input bind:value={$formStore.name} />
  <input bind:value={$formStore.email} />
  <!-- Your form content -->
</form>
```

Now, any changes to `formStore` will be reflected in the URL, and the state can be restored by sharing the URL.

## TypeScript Support

The package includes TypeScript support out of the box. You can specify the type of your store data:

```typescript
interface MyData {
  name: string;
  count: number;
}

const myStore = writable<MyData>({
  name: '',
  count: 0
});
```

## Limitations

- URL length restrictions may apply depending on the browser and server configuration
- Complex data structures (like functions or circular references) cannot be serialized

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this package in your projects