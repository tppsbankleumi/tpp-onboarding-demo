Feature: Login

Scenario: Simple login should succeed
  When The User navigates to the TPP portal with UserName password and Press login
  Then The User can view the TPP portal
