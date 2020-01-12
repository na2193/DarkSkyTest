Feature: Performing validations on Homepage 

   Scenario: Verify timeline hours are incremented by 2 hours 
    Given I navigate to darksky homepage
    When I get all the time in the timeline
    Then I should verify they are incremented by 2 hours

   Scenario: Verify Current temp is not lower than the lowest value from timeline temp
    Given I am on the darksky homepage
    When I get the current temp
    Then I should verify it is not lower than the lowest value from the timeline temp 
 
   Scenario: Verify Current temp is valid through API
    When I get the current temp
    Then I want to verify the temp is valid through the API