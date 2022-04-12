### SEO

#### WmkSeo.Meta

```jsx
WmkSeo.Meta = ({description, lang, title, path, slug, ogImage, twitterImage, twitterHandle, baseUrl, siteTitle})...
```

Assists with page SEO meta data (including open graph and twitter image).
Note: ogImage, twitterImage and twitterHandle expect a string. If undefined is passed, you will see console errors. To intentionally leave out this data, you must pass an empty string '' to these props. For the images, it is good to have a conditional to check for the url or pass an empty string to avoid the console logs.

#### WmkSeo.Schema

```jsx
WmkSeo.Schema = ({ graphs, baseUrl, siteTitle })...
```

Helps dynamically generate on-page schema.
