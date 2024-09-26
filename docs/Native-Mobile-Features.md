# Native Mobile Features

The Native Mobile extension modifies some of [RDVue's features](./Features.md) to behave within
a native mobile environment. The following sections explain what has changed
and what is new.

## Services

Services are focused classed designed to interact with web API endpoints. As a good design pattern a service should:

- only interact with a single domain
- only provide features from the domain which are relevant to the theme of the service. Eg. A user service should be focused on methods support such; adding order related data would make for poor encapsulation.

### Technical

- Each service is able to specify a unique web API endpoint with which to interact - or none at all for services providing local functionality (Eg. wrapper storage mechanism over LocalStorage).

## Screens

A Screen is a conceptual grouping for React Components used in routing. Screens are **not** to be imported by other Screens, Components or Layouts.

### Technical

Each generated Screen is contained within it’s own sub-folder within the **src/screens** directory. The directory contains the following files which each carry out a specific role in developing a Page:

- \[screen\].**tsx**: This contains the React template markup used to implement the structure and layout of a Screen. It is a mix of React Native components/elements and special React syntaxes which allow declarative databinding and structural manipulation.
- \[screen\].style.**tsx**: This contains the dynamic object used to contain styles for each Native component/elements. [React Native's Styling Documentation](https://reactnative.dev/docs/style)

## Routing

The comprehensive package 'React Navigation', is used for routing throughout the mobile project. Refer to the documentation found [here](https://reactnavigation.org/docs/hello-react-navigation) on how to utilize this package.

## Components

Each generated Screen is contained within it’s own sub-folder within the **src/components** directory. The directory contains the following files which each carry out a specific role in developing a Page:

- \[screen\].**tsx**: This contains the React template markup used to implement the structure and layout of a Screen. It is a mix of React Native components/elements and special React syntaxes which allow declarative databinding and structural manipulation.
- \[screen\].style.**tsx**: This contains the dynamic object used to contain styles for each Native component/elements. [React Native's Styling Documentation](https://reactnative.dev/docs/style)

## Stores (Contexts)

A Store is a mechanism for maintain application state in a way which is globally accessible to all screens/components. We use them as intermediary layers to issue API calls to relevant services, and cache the results for \[re\]use. Though the thought may occur to use a plain JavaScript object to achieve state management, a React Store (context) differs in two distinct ways:

- Properties are reactive. Changing Store values will automatically propagate to the component-level bindings which use them.
- Stores enforce a strong process-control for mutating values. Every change within a store **must** go through a specially designed method, in order to update an internal value.

An application can have as many Stores (Contexts) as needed to logically group state concerns. The RDVue CLI creates strongly typed Stores, enabling full Intellisense and compiler support when writing code against them.

### Technical

Refer to [here](https://reactjs.org/docs/context.html) for the documentation on the React Context.

## Unavailable Features

RDVue Mobile currently does not support Layouts, Localization, and Bundle Analysis
