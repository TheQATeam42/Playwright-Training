import {After, Before, ITestCaseHookParameter, setDefaultTimeout} from "@cucumber/cucumber"
import {ScenarioWorld} from "./world"
import {env} from "../../env/parse-env"


setDefaultTimeout(+env("SCRIPT_TIMEOUT"))

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
    console.log(`Running cucumber scenario ${scenario.pickle.name}`)

    // Setting newContext means that we set our browser on completely fresh browser settings
    const contextOptions = {
        recordVideo: {
            dir: `${env("VIDEO_PATH")}${scenario.pickle.name}`,
        }
    }

    // Open a single tab/popup window, within a browser context
    await this.init(contextOptions)
})

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
    const {screen: {page}} = this

    const scenarioStatus = scenario.result?.status

    if (scenarioStatus === "FAILED") {
        const screenshot = await page.screenshot({
            path: `${env("SCREENSHOTS_PATH")}${scenario.pickle.name}.png`,
        })

        this.attach(screenshot, "image/png")
    }

    // Closing all the necessary drivers
    await this.close()
})
