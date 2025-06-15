import dotenv from "dotenv"
import {env, getJsonFromFile} from "./env/parseEnv"
import fs from "fs"
import {GlobalConfig, PageElementMappings} from "./env/types"


dotenv.config({ path: "./common.env" })

const pagesConfig: Record<string, string> = getJsonFromFile(env('PAGES_URLS_PATH'))
const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`)

/**
 * this function returns all the mappings of each page from the mappings directory
 */
const pageElementMappings: PageElementMappings =
    // reduce = gets an array and executes a function based on the array, with parameter
    mappingFiles.reduce((pageElementConfigAcc, file: string) => {
            // remove the json word to get the key
            const key = file.replace('.json', '')
            // gets all the element mappings out of the pages files
            const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`)
            // return object containing each page and its mappings
            return { ...pageElementConfigAcc, [key]: elementMappings }
        },
        {}
    )

const worldParameters: GlobalConfig = {
    pagesConfig,
    pageElementMappings
}

export const globalConfig: GlobalConfig = worldParameters
