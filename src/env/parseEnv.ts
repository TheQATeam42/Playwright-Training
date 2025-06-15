/**
 * returning the json object from the file as a record type
 * @param path
 * @returns
 */
export const getJsonFromFile = <T = Record<string, string>>(path: string): T => {
    return require(`${process.cwd()}${path}`)
}

/**
 * this functions returns the value, according to its given key
 * it takes it with the help of the env parameters
 * @param key
 * @returns
 */
export const env = (key: keyof NodeJS.ProcessEnv): string => {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`)
    }
    return value
}
