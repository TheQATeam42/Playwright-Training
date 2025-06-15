@regression
Feature: Contacts actions

  Background:
    Given i go to the page "home"
    And the element "home title" should contain the text "Contacts"

  @dev
  Scenario: Create a new contact
    When I click on the element "create new contact button"
    And the element "create contact title" should contain the text "Create Contact"
#    Continue from here...
