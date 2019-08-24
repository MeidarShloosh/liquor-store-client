import React from 'react'
import {Container, Header, List, Segment} from "semantic-ui-react";

const README = ()=>{
  return (
      <Container style={{padding:"35px 0px"}}>
          <Header size="huge" textAlign='center'>Boutique Liquor Store</Header>
          <Segment raised>
              <Header size="medium">Store Content</Header>
              <p>
                We are selling all sorts of beverage, alcoholic and non alcoholic further more we offer snacks, and all sorts of accessories related to alcoholic beverages
              </p>
          </Segment>

          <Segment raised>
              <Header size="medium">Additional Pages</Header>
              <p>
                  The additional pages we've added to the store are:
                  <List bulleted>
                      <List.Item><b>/cocktails</b> in which you have multiple cocktails to choose from with the instructions of how to make them,
                          once you've chose your cocktail and added it to your cart all of its ingredients will be added to your cart</List.Item>
                      <List.Item><b>/accessories</b> this page contains all sort of beverage related items that can help you make a cocktail or just to open a beer. you can add these items to your cart.</List.Item>
                      <List.Item><b>/snacks</b> if you are drinking alcoholic beverages sooner or later  you will want some snacks, in the snacks page you will find al sorts of snacks that can go along with your drink</List.Item>
                  </List>
              </p>
          </Segment>

          <Segment raised>
              <Header size="medium">Hard To Do</Header>
                <p>
                    The things that were hard to do for me are the overall architecture design of the app, <br/>
                    I have chosen to incorporate Redux in the store for better overall state management and at first it was hard to
                    come up with the right redux store architecture.<br/>
                    Another thing that was hard is the cocktails page because it incorporates a list of different store items in one cocktail, <br/>
                    and once a user adds a cocktail to their list we needed to add all of those items to the cart and also sync those items with already found items in the cart.
                </p>
          </Segment>

          <Segment raised>
              <Header size="medium">Partner</Header>
                <p>My partner for this assignment is <strong>Niv Rosnovsky, 205662885</strong></p>
                <p>
                  I've mainly focused on the front-end design of the app which includes the incorporation with redux,
                    user management with cookies in which the user is able to see the different pages of the app but its actions are limited until he logs in.

                </p>
          </Segment>

          <Segment raised>
              <Header size="medium">Routes</Header>
              <p>
                 The different routes in the application are:
                  <List>
                      <List.Item>/login</List.Item>
                      <List.Item>/registration</List.Item>
                      <List.Item>/store</List.Item>
                      <List.Item>/cocktails</List.Item>
                      <List.Item>/snacks</List.Item>
                      <List.Item>/accessories</List.Item>
                      <List.Item>/cart  - Private route, for logged in users only</List.Item>
                      <List.Item>/checkout -  Private route, for logged in users only </List.Item>
                      <List.Item>/admin - Private route, for admin only</List.Item>
                      <List.Item>/readme</List.Item>

                  </List>
              </p>
          </Segment>

          <Segment raised >
              <Header size="medium">Security</Header>
                <p>
                    We've made the app secured by using cookie session  based authentication in which only logged in user are able to make operations in the site,<br/>
                    further more we've added a role to each user that indicates if he is an admin which is managed in the backend side of the app.
                    We've managed to avoid DOS attacks by incorporating try catch statements in the backend and thus prevent the server from going down.
                </p>
          </Segment>

          <Segment raised>
              <Header size="medium">React implementation</Header>
              <p>
                  We've built our app using React & Redux and thus managing the state of the app.
              </p>
          </Segment>
      </Container>
  );
};

export default README;