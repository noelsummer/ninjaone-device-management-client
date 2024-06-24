# NinjaOne Device Management

A client web application to manage a list of devices.

## Requirements

- Node.js >= 20.14.0 (LTS)

## Tech Stack

- TypeScript
- React
- Tailwind CSS
- Vite
- pnpm

## How to Install

- Install node_modules \
  `pnpm install`
- Optionally, make a copy of `.env.example` as `.env` \
  Set `VITE_API_URL` as the URL of API \
  `cp .env.example .env`

## How to Run

- `pnpm dev` to run the app in local

## How to Build

- `pnpm build` to build the app
- `pnpm preview` to preview the productioin in local

## Commands for Devlopment

- `pnpm lint` to check and fix lint errors
- `pnpm format` to enforce coding styles
- `pnpm test` to run automated tests

## Decisions Made

- According to requirements, created a React + TypeScript app using Vite and pnpm.
- Setup ESLint and Prettier for maintainable and readable codebase.
- Setup Husky to avoid messy code in SCM tool - Git.
- Setup Tailwind CSS.
- Added assets.
- Added API service to the project.
  - Added API callers to CRUD devices.
  - Added useRetryableFetch hook for better UX letting users can refetch again smoothly when failed to fetch.
- Setup component structure for frontend and added edge case handlers like invalid URLs.
- Built responsive devices pages and modals.
  - Based on the design, no pagination was implemented. This is also related to the backend provided. Pagination on only fronend is meaningless.
  - Comparing UI design, it's not pixel-perfect. For better looks, real pages might have differences of 1 - 8 pixels. For example, the height of header is 56px while it's 50px in Figma design.
  - For better readibility, I setup container layout, not container-fluid. If a user has 4000+px wide screen, this is definitely better!
- Setup store. Used useReducer provided by React rather than opinionated state management libraries like redux to save time.
- Made URL stateful. When search queries get changed, it's reflected on browser URL and users don't need to set queries again after hard refreshs.
- Add sample unit tests for 2 components and 1 utility.

## Trade-offs (Future Plan)

- Device types (Mac, Linux, Windows) are defined manually, but this should be from the API as well for scalability.
- No pagination. This requires APIs to be updated.
- For now, webp icon was used for favicon. Webp-format icon can be used only on modern browsers.
- It doesn't have good accessibility, for example for blind users.

## Future Plan

If I have more time, I would do:

- make components more generic and better
- optimize performance by introducing good features like Lazy Loading
- implement caching
- improve accessibility by implementing internalization, multiple color themes, using more semantic tags, optimizing assets, etc.
- implement cross-browser compatibility to provide the best UX to more customers
- improve UI for better UX
- investigate and fix any potential security issues like XSS attacks
- setup CI/CD pipelines.
- In case we have n number of devices,
  - implement pagination with updated backend OR implement virtualization and infinite scrolling instead
  - we can introduce GraphQL to avoid over-fetching or under-fetching for especially mobile users. this way we can optimize data structure in communication between frontend and backend. But I DO NOT think Ninjaone have many mobile users.
- Write unit / integration / e2e tests. We can go for Jest / React Testing Library / Cypress but for testing browser compatibility in various browsers (Chrome, Firefox, Safari, Opera), Playwright would be a good option.

## Assessment Requirements

- [x] The devices have the following required properties: id, system_name, type, and hdd_capacity.
- [x] User can filter devices by a single type.
- [x] User can sort devices by name or HDD capacity.
- [x] User can create, update, and delete devices.
- [x] Include instructions on how to run the app in the README file.

## Extra Credits

- [x] Testing
- [ ] Documentation
- [x] Filtering by multiple types
- [ ] Version control
