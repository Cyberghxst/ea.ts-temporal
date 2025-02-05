import { APIFunction, type Data, ParamType } from 'easy-api.ts'
import { Temporal } from 'temporal-polyfill'
import { makeUsage } from '..'

/**
 * Get a temporal time.
 */
export default class GetTemporalTime extends APIFunction {
    name = '$getTemporalTime'
    description = 'Get a temporal time.'
    parameters = [
        {
            name: 'Name',
            description: 'The name of the temporal time.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Type',
            description: 'The type of time to return.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null,
            allowedValues: [
                'nanoseconds',
                'microseconds',
                'milliseconds',
                'seconds'
            ]
        }
    ]
    usage = makeUsage(this.name, this.parameters)
    returns = ParamType.Boolean
    compile = true
    async run(d: Data, [name, type]: string[]) {
        const time = d.getInternalVar<Temporal.Instant>(`temporal:${name}`)
        
        switch (type) {
            case 'nanoseconds':
                return time.epochNanoseconds.toString()
            case 'microseconds':
                return time.epochMicroseconds.toString()
            case 'milliseconds':
                return time.epochMilliseconds.toString()
            case 'seconds':
            default:
                return time.epochSeconds.toString()
        }
    }
}
