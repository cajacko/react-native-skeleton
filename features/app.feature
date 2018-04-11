Feature: Simple maths
As: a developer
I want: to check the app renders the testID
So that: I can prove the UI testing works

    Scenario: App is visible
        When the app is reloaded
        Then an element with an id of "app" "is" visible

    Scenario: Random element does not exist
        When the app is reloaded
        Then an element with an id of "random" "is not" visible

