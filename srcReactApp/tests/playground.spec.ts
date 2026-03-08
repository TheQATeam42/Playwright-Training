import { expect } from "playwright/test";
import reactAppTest from "./setup/testLevelHooks.setup";

const playGroundTest = reactAppTest.extend({});

// Movie Search Scenario
playGroundTest("Movie Search", async ({ playground }): Promise<void> => {
  const playGroundPage = playground();

  // set the url the right page
  await playGroundPage.goto();

  // search for value and chose the first option
  await playGroundPage.searchSelectByLabel('Movie', "The Dark Kni");
  const movieInput = await playGroundPage.getElementByCss("for", 'movies-input');
  
  // checks if the input value changed to the full name
  await expect(movieInput).toHaveValue("The Dark Knight");
  
  // delete the input value
  const removeButton = await playGroundPage.getElementByCss("aria-label", 'Clear');
  await removeButton.click() 
 
  // make no search and chose the first option
  await movieInput.click() 
  await playGroundPage.searchSelectByLabel('Movie', "");
  await expect(movieInput).toHaveValue(/.+/);
});


// Swithes Scenario
playGroundTest("Check Swithes", async ({ playground }): Promise<void> => {
  const playGroundPage = playground();

  // set the url the right page
  await playGroundPage.goto();

  // get the 2 switches
  const enabledSwitch = await playGroundPage.getElementByCss("data-id", "switch-one");
  const disabledSwitch = await playGroundPage.getElementByCss("data-id", "switch-two");

  // click them
  await enabledSwitch.click();
  await disabledSwitch.click();

  // check if the first does work, as should
  await expect(enabledSwitch).toBeChecked();
  
  // check if the second doesnt work, as should
  await expect(disabledSwitch).toBeDisabled();
});

