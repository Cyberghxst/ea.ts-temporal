import type { ParameterDefinition } from 'easy-api.ts/lib/classes/structures/APIFunction'
import { Addon, type API, ParamType } from 'easy-api.ts'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

/**
 * The directory where the functions are stored.
 */
const FUNCTIONS_DIR = __dirname + '/functions'

/**
 * The directory where package.json file is located.
 */
const PACKAGE_PATH = join(__dirname, '..', 'package.json')

/**
 * The content of the package.json file as string.
 */
const RAW_PACKAGE_JSON = readFileSync(PACKAGE_PATH, 'utf-8')

/**
 * Converts a text to formal case.
 * @param text - The text to convert.
 * @returns {string}
 */
export const toCamelCase = (text: string): string => {
    return text.split(' ')
    .map((part, i) => i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

/**
 * The string parameter types from eats.
 */
const stringParamTypes = Object.keys(ParamType).filter(x => isNaN(Number(x)))

/**
 * Makes the usage for a function.
 * @param name - The name of the function.
 * @param params - The parameters for the function.
 * @returns {string}
 */
export const makeUsage = (name: string, params: ParameterDefinition[]): string => {
    const usage = params.map(
        p => `${
            p.rest ? '...' : ''
        }${toCamelCase(p.name)}${
            p.required ? '' : '?'
        }: ${
            stringParamTypes[p.type].toLowerCase()
        }`
    )
    .join(', ')

    return `${name}[${usage}]`
}

/**
 * Addon that adds the Temporal object to easy-api.ts
 * @example
 * const api = new API({
 *     addons: [new EATSTemporal()]
 * })
 */
export class EATSTemporal extends Addon {
    name = '@ea.ts/temporal'
    description = 'easy-api.ts addon that implements "Temporal", the object that enables date and time management in various scenarios, including built-in time zone and calendar representation, wall-clock time conversions, arithmetics, formatting, and more. It is designed as a full replacement for the Date object in JavaScript.'
    version = JSON.parse(RAW_PACKAGE_JSON).version

    /**
     * Inits the addon.
     * @param server - The API instance.
     * @returns {void}
     */
    public init(server: API) {
        if (existsSync(FUNCTIONS_DIR)) {
            server.functions.load(FUNCTIONS_DIR)
        }
    }
}
