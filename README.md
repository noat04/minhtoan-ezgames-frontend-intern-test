# Pages & Co. - Frontend Developer Intern Technical Test

## Project Overview

Pages & Co. is a responsive bookstore website implemented from the reference designs supplied for the EZ Games Frontend Developer Intern Technical Test.

The project demonstrates the main evaluation criteria in the brief:

- translating supplied layouts into working pages;
- organizing content with semantic HTML;
- identifying and reusing shared UI components;
- building responsive layouts with pure CSS, Flexbox, and Grid;
- implementing browser interactions with Vanilla JavaScript;
- maintaining clear project structure and consistent visual details.

No CSS framework, JavaScript framework, UI library, or build tool is required.

## Requirement Coverage

| Evaluation criterion | Implementation in this project |
| --- | --- |
| Layout analysis | Four pages and one shared modal were recreated from the supplied designs: Home, Book Listing, Book Detail, Bag/Checkout, and Login Modal. |
| Semantic HTML | Pages use `header`, `nav`, `main`, `section`, `article`, `figure`, `aside`, `footer`, `form`, and correctly typed buttons where appropriate. |
| Reusable components | Header, footer, login modal, book cover, book card, and cart state are shared instead of being duplicated in every page. |
| Responsive CSS | Flexbox, CSS Grid, fluid containers, CSS custom properties, and media queries adapt the interface for desktop, tablet, and mobile widths. |
| JavaScript interactions | Hero slider, search, genre filtering, sorting, detail rendering, add-to-bag, cart quantity/removal, persistent bag count, and login modal controls are functional. |
| Code organization | CSS is separated into base, component, page, and responsive layers. JavaScript is separated into data, core, component, and page modules. |
| UI consistency | Shared colors, spacing, borders, typography, buttons, gradients, and book-card proportions are controlled through reusable styles and CSS variables. |

## Implemented Pages

### Home (`index.html`)

- Three-state hero slider with previous/next controls and indicator dots
- Browse-by-genre cards with dynamically calculated book counts
- Featured, bestseller, and new-arrival sections rendered from shared book data
- Promotional reading-room banner
- Shared responsive header, footer, and login modal

### Book Listing (`lists.html`)

- Responsive book collection grid
- Genre filtering
- Sorting by price and rating
- Search by title, author, or genre using the header search form
- Dynamic result count and empty-result state
- Links from book cards to the corresponding detail page

### Book Detail (`detail.html`)

- Book selection through the `id` query parameter
- Dynamic cover, title, author, rating, price, and metadata
- Add-to-bag interaction
- Related-book recommendations
- Responsive two-column-to-single-column layout

### Bag / Checkout (`checkout.html`)

- Cart items rendered from persisted cart state
- Increase and decrease quantity controls
- Remove-item interaction
- Dynamic subtotal, total, and shared header bag count
- Empty-cart state
- Responsive cart and order-summary layout

### Login Modal

- Shared modal available from every page
- Open and close controls
- Close on overlay click or `Escape`
- Focus moves to the email field when opened
- Native HTML validation for required email and password fields

## Architecture

The JavaScript follows a small component-oriented Vanilla JavaScript architecture. Modules register themselves on the shared `window.PagesApp` namespace. `js/main.js` initializes only the page modules loaded by the current document.

```text
.
|-- index.html
|-- lists.html
|-- detail.html
|-- checkout.html
|-- css/
|   |-- base/          # variables and reset
|   |-- components/    # shared UI styles
|   |-- pages/         # page-specific layouts
|   |-- responsive.css # shared media queries
|   `-- style.css      # CSS import entry point
`-- js/
    |-- data/          # book, genre, and mock user data
    |-- core/          # shared utilities and cart storage
    |-- components/    # reusable rendered components
    |-- pages/         # page-specific rendering and interactions
    `-- main.js        # application entry point
```

This separation keeps page logic independent while allowing shared components and data to be reused across the website.

## Reusable Components

- `SiteHeader`: brand, navigation, search form, sign-in action, and bag counter
- `SiteFooter`: navigation groups, social links, and newsletter form
- `LoginModal`: shared dialog markup and modal behavior
- `BookCard`: reusable book-cover and product-card renderer
- `CartStore`: `localStorage` access and synchronized bag count
- `Utils`: shared currency formatting, genre colors, and text helpers

## CSS Strategy

- CSS custom properties centralize the color palette, container width, spacing, and shared design values.
- CSS Grid handles book grids, genre grids, detail layouts, checkout layouts, and footer columns.
- Flexbox handles navigation, controls, headings, actions, and smaller one-dimensional layouts.
- Book covers and genre cards use subtle `135deg` gradients and shadows to reproduce the supplied visual treatment.
- Shared responsive breakpoints are defined at `980px` and `640px`, with page-level rules where a layout needs specific adjustment.

## JavaScript Design

### Shared state

The bag is stored under the `pagesAndCoCart` key in `localStorage`. Cart changes persist after page reload and update every visible `.bag-count` element.

### Data-driven rendering

Book and genre information is stored separately from page markup. Home sections, listing results, book details, recommendations, and cart items are generated from shared data.

### Event handling

The project uses DOM events and event delegation for controls rendered dynamically, including filters, hero indicators, quantity buttons, and item removal.

## Accessibility Considerations

- Semantic landmarks and heading structure
- Accessible labels for navigation, search, modal, filters, and controls
- Native `button`, `form`, `label`, and input elements
- `aria-current` for active navigation and hero indicators
- `aria-hidden`, `aria-modal`, and `aria-labelledby` for the login dialog
- Keyboard closing of the modal with `Escape`
- Visible text content on CSS-generated book covers

## Running the Project

The project has no installation or build step. Serve the project directory with any local static server, then open `index.html`.

Example using VS Code Live Server:

```text
http://127.0.0.1:5500/index.html
```

## Current Scope and Limitations

This submission is frontend-only. The following controls are intentionally presentation-level and are not connected to a backend service:

- sign-in submission does not authenticate a real user;
- wishlist state is not persisted;
- checkout does not process an order or payment;
- newsletter submission does not send data;
- the modal does not yet implement a complete keyboard focus trap.

These limitations are explicit so the documented behavior matches the implementation.

## Development Process

1. Analyzed visual hierarchy, page widths, grids, spacing, and repeated patterns in the supplied designs.
2. Created semantic page structures and identified shared components.
3. Built desktop layouts with reusable CSS variables, Flexbox, and Grid.
4. Added tablet and mobile behavior with media queries.
5. Separated JavaScript into data, core services, reusable components, and page modules.
6. Implemented and verified the required browser interactions.
7. Refined visual proportions and documented the completed scope and known limitations.

## AI Assistance

AI tools were used as development support for code review, debugging suggestions, component-structure discussion, and documentation refinement. Final implementation decisions, integration, visual adjustments, and verification were reviewed and completed by the author.

## Author

**Nguyen Danh Minh Toan**  
Frontend Developer Intern Candidate  
Technical Test Submission for EZ Games
