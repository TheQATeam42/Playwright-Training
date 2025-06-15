import {Browser, BrowserContext, BrowserContextOptions, Page} from "playwright"
import {IWorldOptions, setWorldConstructor, World} from "@cucumber/cucumber"
import * as playwright from "@playwright/test"
import {BrowserType} from "@playwright/test"
import {GlobalConfig, GlobalVariables} from "../../env/global-types"


export type Screen = {
    browser: Browser
    context: BrowserContext
    page: Page
}

export class ScenarioWorld extends World {
    screen!: Screen
    globalConfig: GlobalConfig
    globalVariables: GlobalVariables

    constructor (options: IWorldOptions) {
        super(options)
        this.globalConfig = options.parameters as GlobalConfig
        this.globalVariables = {}
    }

    async init (contextOptions: BrowserContextOptions): Promise<Screen> {
        // Closing all the unwanted drivers, if the session is still opened
        await this.screen?.page.close()
        await this.screen?.context.close()
        await this.screen?.browser.close()

        const browser = await this.newBrowser()
        const context = await browser.newContext(contextOptions)
        const page = await context.newPage()

        this.screen = {browser, context, page}

        return this.screen
    }

    async newBrowser (): Promise<Browser> {
        const browserTypes: BrowserType = playwright["chromium"]

        return await browserTypes.launch({
            headless: process.env.HEADLESS !== "false",
            args: ["--disable-web-security", "--disable-features=IsolateOrigins, site-per-process"]
        })
    }

    async close (): Promise<void> {
        await this.screen.page.close()
        await this.screen.context.close()
        await this.screen.browser.close()
    }
}

// Sets the class to whole the project
setWorldConstructor(ScenarioWorld)
