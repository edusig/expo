# expo-stories CLI

This CLI generates a `stories.js` file in the specified `projectRoot` directory, which exports all of the `.stories` files that it finds in the `watchRoot` directory. The exports are formtted in a metro friendly way (e.g for use in RN apps).

It provides additional configuration by parsing out `.storyConfig` static properties on each exported component to determine any extra information that might be useful in the future - these properties are likely to be fleshed out (and typed) in the near future as requirements become more clear.

## Getting started:

There is only one command in the CLI:

```bash
expo-stories start -p <projectRoot> -w <watchRoot>
```
