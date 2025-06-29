/**
 * Removes non-standart characters and whitespaces from text
 * @param rawText 
 * @returns string that contains alphabetic characters, numbers and " " spaces
 */
export const sanitizeText = (rawText: string) => {
    return rawText.trim().replace(/\s+/g, " ")
}
