// This files runs first before all the other files
import dotenv from "dotenv"
import {
    GlobalConfig,
    PageElementMappings,
    PagesConfig,
    ConstParametersConfig
} from "./env/global-types"
import {env, getJsonFromFile} from "./env/parse-env"
import * as fs from "fs"

// Configuring the common.env file, so that all the files can use the arguments inside that file
dotenv.config({path: "common.env"})

const pagesConfig: PagesConfig = getJsonFromFile(env("PAGES_URL_PATH"))
// Synchronously read the directory where all the mappings are (all the identifier)
const mappingFiles = fs.readdirSync(`${process.cwd()}${env("PAGE_ELEMENTS_PATH")}`)
const constParametersConfig: ConstParametersConfig = getJsonFromFile(env("CONST_PARAMETERS_PATH"))

// This object contains all the mappings from all the json files
// Each loop of the reduce will add what we return to the object
const pageElementMappings: PageElementMappings =
    mappingFiles.reduce((pageElementConfigAccumulator: PageElementMappings, fileName: string) => {
        // We get the name of the mapping file with the json ending
        // But we don't get it in the feature file when we navigate across different pages
        const key: string = fileName.replace(".json", "")
        // Getting all the mappings from the file
        const elementMappings: Record<string, string> = getJsonFromFile(`${env("PAGE_ELEMENTS_PATH")}${fileName}`)

        // Spread operator (...) - returning the function with the given parameters
        return {...pageElementConfigAccumulator, [key]: elementMappings}
    }, {})

// Passing this in the common string
const worldParameters: GlobalConfig = {
    pagesConfig,
    pageElementMappings,
    constParametersConfig
}

// Passing all the cucumber arguments for running the cucumber scenarios, we put it with the profile
const common =
    `./src/features/**/*.feature \
    --require-module ts-node/register \
    --require ./src/step-definitions/**/**/*.ts \
    --world-parameters ${JSON.stringify(worldParameters)} \
    -f json:./reports/report.json \
    --format progress-bar`

// Profiles for running the tests, we add the tag to the scenarios/feature as needed
const dev = `${common} --tags @dev`
const regression = `${common} --tags @regression`

export {dev, regression}
