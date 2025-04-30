# HOPCo Senior Frontend Developer task

Task is to create a hospital inventory management app using Vue, using an OOP approach.

## Requirements:

- Make a simple login page. This does not need to connect to any backend, but should
  accept usernames from 2 users you have fixtures for, representing clinicians at 2
  different hospitals
- Based on the user, render a hospital inventory list as a table - product name, item
  number, manufacturer, category, quantity. Assume that each hospital can have
  thousands of items
- Make this list configurable per hospital. Each hospital may require different information
  about its assets. For example, one of the hospitals wants additionally to see the product
  expiry date and price
- Provide sorting and filtering options for each displayed column in this list
- There should be a dedicated page where the user can add, update, or remove assets
  from the list
- Provide test coverage for your app

## 💿 The ideal implementation will demonstrate:

- Strong frontend architecture
- Use of object-orientation
- Good UX / UI
- Strong test coverage - use whatever types of test automation you want
- An approach to commenting that you can justify (this could be lots of comments, no
  comments, or anywhere in between - so long as you can explain your approach)

If you find generative AI tools add value to your work, feel free to use them. You should include
comments within the code clearly showing what tools were used and where, including example
prompts.

## Implementation

This application implemented with Vue 3, Typescript, Pinia, Vue Router and Vuetify framework. I also used Lodash and Chance libraries.

- Pinia was chosen as it's the most powerful store for Vue.js for today for my opinion
- There were 2 reasons for choosing Vuetify:
  1. I was looking for ready made data table vue component which implements sort, filter and pagination (or infinte scroll).
     I wanted this to be server-side ideally, because it's better for large datasets as it improve efficiency, reduce bandwidth, scale better, optimize database use, enhance security, and deliver a smoother user experience.
     Such component was found in vuetify library :) https://vuetifyjs.com/en/components/data-tables/server-side-tables
  2. Vuetify was mentioned as desirable skill for this role and I've never tried it out before so I was curious :)
- Lodash-es is the ECMAScript module (ESM) version of Lodash. It's a great tool for operations with arrays like filter/sort etc which we needed here for implementation of fake api for server side data table
- Chance is good library for generating random values, we needed it to create large fixture dataset.

Login screen is completely tested with cypress. There is also list of cases for Dashboard screen.

There are 2 users to login from different hospitals, each has different set of columns according to their hospoital:

- Login: Maria, password: password1
- Login: Maks, password: password2

Table filter activates when any filter field loses focus.
Columns are sortable by click on arrow icon for each column.
