This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Setup

This project is built using **Next.js**, a React framework for building modern web applications. Below are the details of the project setup:

### Pages Structure

The application is organized into the following pages:
- **Home Page**: Located at `src/app/page.js`, this is the main landing page of the application.
- **Admin Page**: Located at `src/app/admin/page.js`, this page is designed for administrative tasks.
- **Register Page**: Located at `src/app/register/page.js`, this page handles user registration.
- **Shop Page**: Located at `src/app/shop/page.js`, this page displays the products available for purchase.

### Components

The project includes reusable components organized into folders:
- **Dashboard Components**: Includes `AdminNavbar`, `DataTable`, `Sidebar`, and `StatCards`.
- **Registration Components**: Includes `OtpModal` and `StepIndicator`.
- **Shop Components**: Includes `Hero`, `ProductCard`, and `ShopNavbar`.
- **UI Components**: Includes `ThemeProvider` for managing themes.

### State Management

State is managed using **Redux Toolkit**. The following slices are used:
- `cartSlice.js`: Manages the shopping cart state.
- `registrationSlice.js`: Handles user registration state.
- `sidebarSlice.js`: Manages the sidebar state.
- `themeSlice.js`: Handles theme-related state.

### Packages Used

The project uses the following key packages:
- **Next.js**: Framework for building the application.
- **React**: Library for building user interfaces.
- **Redux Toolkit**: For state management.
- **Framer Motion**: For animations.
- **Tailwind CSS**: For styling.
- **PostCSS**: For processing CSS.
- **Next/Image**: For optimized image handling.

### Running the Project

To run the project locally, use the following commands:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.


