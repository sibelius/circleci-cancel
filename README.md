# Circleci auto-cancel redundant builds

from any branch

## How to run

Install deps
```bash
yarn install
```

Run
```jsx
yarn cancel <authorization> <orgName> <orgRepo> <branch>
```

Example usage

```jsx
yarn cancel <mypersonaltoken> sibelius circleci-cancel master
```

## How to generate a token
Follow this https://circleci.com/docs/2.0/managing-api-tokens/

it works with Personal Tokens
