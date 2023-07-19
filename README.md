# Imgur Gallery Feed Challenge

Created using Next.js 13 and Redux.

I wanted to implement something similar to what the grid in imgur.com looks like, cloning it pixel by pixel would've taken a very long time, so I took the top features it has which for me were the masonry style layout and more importantly, a lazy loading implementation of images/videos that is both performant and good looking.

I needed to install some extra libraries, mainly react-masonry-css to achieve the masonry layout on the Home page and react-intersection-observer to interact more easily with the Intersection Observer API in order to have lazy loading of both images and videos, as well as to implement 'infinite scrolling' on the feed.

## Live Demo

[Live Demo here](https://with-redux-app-two.vercel.app/)

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
