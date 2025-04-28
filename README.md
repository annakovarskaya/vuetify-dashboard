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

This application implemented with Vue 3, Typescript, Pinia, Vue Router and Vuetify framework.

- Pinia was chosen as it's the most powerful store for Vue.js for today for my opinion
- There were 2 reasons for choosing Vuetify:
  1. It has data table server component which is really suitable for given task - it supports filter and sort which were requested to implement and pagination also which is must have(or infinite scroll alternatively) for large sets of data mentioned in the task
  2. Vuetify was mentioned as desirable skill for this role and I've never tried it out before so I was curious :)
