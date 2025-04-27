# HOPCo Senior Frontend Developer task

Task is to create a hospital inventory management app using Vue, using an OOP approach.

## Requirements:

● Make a simple login page. This does not need to connect to any backend, but should
accept usernames from 2 users you have fixtures for, representing clinicians at 2
different hospitals
● Based on the user, render a hospital inventory list as a table - product name, item
number, manufacturer, category, quantity. Assume that each hospital can have
thousands of items
● Make this list configurable per hospital. Each hospital may require different information
about its assets. For example, one of the hospitals wants additionally to see the product
expiry date and price
● Provide sorting and filtering options for each displayed column in this list
● There should be a dedicated page where the user can add, update, or remove assets
from the list
● Provide test coverage for your app

## 💿 The ideal implementation will demonstrate:

● Strong frontend architecture
● Use of object-orientation
● Good UX / UI
● Strong test coverage - use whatever types of test automation you want
● An approach to commenting that you can justify (this could be lots of comments, no
comments, or anywhere in between - so long as you can explain your approach)

If you find generative AI tools add value to your work, feel free to use them. You should include
comments within the code clearly showing what tools were used and where, including example
prompts.

## My questions for now:

1. Am I expected to fake API or simple import from json fixture would be enough?
   2.  &quot;Based on the user, render a hospital inventory list as a table - product name, item
   number, manufacturer, category, quantity. Make this list configurable per hospital.
   Each hospital may require different information about its assets. For example, one of
   the hospitals wants additionally to see the product
   expiry date and price&quot; - that&#39;s not 100% clear for me. Do we assume that:
     Every hospital has a base set of columns as product name, item, number,
   manufacturer, category, quantity, but some hospitals can have some more
   columns on top additionally?
   OR
    Each hospital can have completely different set of columns like one has x, y, z and
   another has product name, item, number
   My personal opinion is that the first option is more sensible for our business case, but I
   would ask product and/or team lead in real life situations as requirements aren&#39;t completely
   clear for me.
2. And just to double-check my understanding - when we say that columns list should be
   configurable per hospital it means we get this configuration from API response (fixture in my
   case). But I&#39;m not expected to implement client side admin which will allow me to
   configure columns for each hospital in the vue app, right?
3. &quot;Assume that each hospital can have thousands of items&quot;. Can I also assume that my
   imaginative API supports pagination, sorting and filtering? Or should I expect that all
   possible data arrives in 1 API response and I need to implement client-side pagination,
   sorting and filtering? 
4. &quot;There should be a dedicated page where the user can add, update, or remove
   assets from the list&quot; - not 100% clear what is meant by a dedicated page where the user
   can add, update or remove assets. it could be: we see data table with:
     &quot;add&quot; button on the top of the table which takes us to:
   a) dedicated page with a form to fill and save - which is the best solution if we can
   have many columns
   b) modal  with a form to fill and save - which is the best solution if we can be sure
   we&#39;ll always have just a few coulmns (like &lt;= 10)
    &quot;edit&quot; and &quot;delete&quot;:
   a) could be implemented as edit and delete buttons at each table row, which is the
   best solution if we can delete and edit only 1 by 1
   b) selection checkbox at each row and edit and delete buttons on the top of the table,
   which is the best solution if we consider bulk delete/edit
    &quot;edit&quot; will take us to:
   a) dedicated page with filled form to update and save - which is the best solution if
   we can have many columns
   b) modal  with a filled form to fill and save - which is the best solution if we can be
   sure we&#39;ll always have just a few coulmns (like &lt;= 10)  

choice for edit should be consistent to choice of add - both should be either
dedicated pages or modals
 &quot;delete&quot; should render confirmation modal before actual data update
I just gave possible options which I can see and again - i can assume and pick something which looks most sensible for me personally in terms of the given business case. But I would ask this kind of questions having real life requirements like those

6. same fixtures question for end to end tests as in point 1 for app - is json fixture enough to
   provide test data or better implement it with mocks and stubs?
7. Am I expected to implement it using only Vue3 + TypeScript, or usage of vue component
   frameworks like Vuetify which was mentioned in job description as desirable is ok? I&#39;m fine
   with either it&#39;s just important to understand what does the team want to see 
    implementing functionality from scratch, inventing a bit of bicycle
   OR 
    using the right tools for the right case to make stuff happen faster?
8. Do we assume that some column value could be optional?
   So if we add a new item to a table with columns - a, b, c, is it possible that a, b are mandatory fields to fill and we can skip c?
9. From given examples I can see such types of dashboard's columns: string, number, date.
   Is that type list exhaustive for the task implementation?
   In the real world I can also imagine booleans(which can be shown as Yes/No or Set/Unset etc), time, dateTime and any other specific data types.
   Also do we want to have different types of filtering or just "EQUALS" is enough? I do hope it's enough for test task but in real life we can have such types of filtering:

- equals, not equals - for any type. there also could be exist/not exist filters if there's a possibility to hace optional column values from previous question.
- greater than, less than on top of first point - for number, date, time, datetime
- different string searches for string like startsWith, includes, word search etc.
