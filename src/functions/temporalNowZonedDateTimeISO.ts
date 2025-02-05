import { APIFunction, type Data, ParamType } from 'easy-api.ts'
import { Temporal } from 'temporal-polyfill'
import { makeUsage } from '..'

/**
 * Get the current calendar date and clock time in a specific time zone,
 * using the ISO 8601 calendar.
 */
export default class TemporalNowZonedDateTimeISO extends APIFunction {
    name = '$temporalNowZonedDateTimeISO'
    description = 'Get the current calendar date and clock time in a specific time zone, using the ISO 8601 calendar.'
    parameters = [
        {
            name: 'Timezone',
            description: 'The IANA timezone identifier. (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)',
            type: ParamType.String,
            required: false,
            rest: false,
            defaultValue: null
        }
    ]
    usage = makeUsage(this.name, this.parameters)
    returns = ParamType.Number
    compile = true
    run = async function(_: Data, [timezone]: string[]) {
        return Temporal.Now.zonedDateTimeISO(timezone || undefined).toString()
    }
}
