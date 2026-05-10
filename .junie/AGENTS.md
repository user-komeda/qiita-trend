# Project Overview

This project is a monorepo for "qiita-trend", consisting of a NestJS backend and a Next.js frontend.

## Project Structure

- `apps/qiita-trend-backend`: NestJS-based backend API.
- `apps/qiita-trend-front`: Next.js-based frontend application.
- `docker-compose.yml`: Defines infrastructure services like Redis and PostgreSQL.
- `turbo.json`: Configuration for Turborepo to manage the monorepo build pipeline.

## Tech Stack

- **Monorepo Management**: [Turborepo](https://turbo.build/)
- **Package Manager**: [Yarn](https://yarnpkg.com/) (v4)
- **Backend**: [NestJS](https://nestjs.com/)
- **Frontend**: [Next.js](https://nextjs.org/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Linting & Formatting**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Environment Management**: [Infisical](https://infisical.com/) (via `infisicalLauncher`)

## Development Commands

- `yarn dev`: Start both backend and frontend in development mode using Turbo.
- `yarn build`: Build all applications.
- `yarn check`: Run linting, formatting checks, type checking, and tests across the monorepo.
- `yarn compose:upAll`: Start infrastructure services (PostgreSQL, Redis) and applications via Docker Compose.

## Guidelines for Junie

- **Tests**: Always run `yarn test` in the relevant app directory or `yarn check` at the root to verify changes.
- **Code Style**: Follow the existing ESLint and Prettier configurations.
- **Commits**: Follow the project's commit conventions if applicable.
