import type { GlobalConfig } from './types'

export const globalConfig: GlobalConfig = {
    pagesConfig: {
        homePage: 'http://localhost:3000',
    },
    pageElementMappings: {
        homePage: {
            searchInput: 'input[placeholder="Search contacts"]',
            contactListItem: '.contact-list-item',
            deleteButton: 'button.delete-contact',
            contactNameDisplay: 'contact-name',
        },
    },
}
