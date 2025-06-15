/**
 * Getting the value of an env variables by given key, and of variables we declare in the common.env file
 * @param key
 */
export const env = (key: string): string => {
    const value = process.env[key]
    if (!value) {
        throw Error(`No environment variable found for key '${key}'`)
    }

    return value
}

/**
 * Returns the path of the current directory, plus the path of the json file
 * This will enable us to get the content of the json file, by taking its full dir path
 * @param path
 */
export const getJsonFromFile = <T = Record<string, string>>(path: string): T => {
    return require(`${process.cwd()}${path}`)
}
