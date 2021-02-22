Feature: Consent Approve

Scenario: User Approve Consent should succeed
  When The User navigates to the TPP portal with UserName password and Press login
  When User press Signup And login to bank application
  When User Enter his personal Phone
  When User Enter OTP code
  When User Approve Consent Account
  Then The User can view His Balance
