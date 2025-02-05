import { APIFunction, type Data, ParamType } from 'easy-api.ts'
import { Temporal } from 'temporal-polyfill'
import { makeUsage } from '..'

/**
 * Adds time to a temporal time instance.
 */
export default class TemporalAddTime extends APIFunction {
    name = '$temporalAddTime'
    description = 'Adds time to a temporal time instance.'
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
            description: 'The type of the time.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null,
            allowedValues: [
                'nanoseconds',
                'microseconds',
                'milliseconds',
                'seconds',
                'minutes',
                'hours'
            ]
        },
        {
            name: 'Amount',
            description: 'The amount of time to add.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = makeUsage(this.name, this.parameters)
    returns = ParamType.Boolean
    compile = true
    async run(d: Data, [name, type, amount]: string[]) {
        const time = d.getInternalVar<Temporal.Instant>(`temporal:${name}`)
        const duration: Temporal.DurationLike = {}
        duration[type as keyof Temporal.DurationLike] = parseInt(amount)

        time.add(duration)
    }
}
