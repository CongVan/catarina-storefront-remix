# Catarina online shop

The online shop about perfume

## Live demo

https://catarina.shop/

## Techstack

- [Remix v2](https://remix.run/)
- [Wordpress/Woocommerce](https://woocommerce.com/)
- [Tailwindcss v3.0](https://tailwindcss.com/)
- [Storefront UI React](https://docs.storefrontui.io/v2/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/CongVan/catarina-storefront-remix.git
```

Go to the project directory

```bash
  cd catarina-storefront-remix
```

Install dependencies

```bash
  yarn install
```

Build

```bash
  yarn build
```

Start development

```bash
  yarn dev
```

Start production

```bash
  yarn start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SESSION_SECRET` use for server session

`WOO_HOST` wordpress's host

`WOO_API` wordpress's woocommerce url api

`WOO_KEY` woocommerce key

`WOO_SECRET` woo commerce secret
`JWT_AUTH_SECRET` auth secret config by wordpress [plugin](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)

`SITE_URL` current site url

## License

[MIT](https://choosealicense.com/licenses/mit/)
