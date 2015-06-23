# postcss-dpr-px [![Build Status][ci-img]][ci]

[PostCSS] plugin to replace value in px with new value for device pixel ratio.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ogwmnm/postcss-dpr-px.svg
[ci]:      https://travis-ci.org/ogwmnm/postcss-dpr-px


```css
.foo {
  width: 24px;
}
```

For device pixel ratio 1.5:

```css
.foo {
  width: 16px;
}
```

## Usage

```js
postcss([ require( "postcss-dprpx" ) ])
```

### Options

#### `dpr` (default: 1)

See [PostCSS] docs for examples for your environment.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
