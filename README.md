# Imgur Gallery Feed Challenge

Created using Next.js 13 and Redux.

I wanted to implement something similar to what the grid in imgur.com looks like, cloining it pixel by pixel would've taken me a very long time, so I took the top features it has which for me where the masonry style layout and more importantly, a lazy loading of images/videos that is both performant and good looking.

I needed to install some extra libraries, mainly react-masonry-css to achieve the masonry layout on the Home page and react-intersection-observer to interact more easily with the Intersection Observer API in order to have lazy loading of both images and videos, as well as to implement to implement 'infinite scrolling' on the feed.

## How to use

```bash
pnpm install
```

Start development server

```bash
pnpm dev
```

Run production build

```bash
pnpm build
pnpm start
```
