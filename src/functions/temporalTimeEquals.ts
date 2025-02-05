import { APIFunction, type Data, ParamType } from 'easy-api.ts'
import { Temporal } from 'temporal-polyfill'
import { makeUsage } from '..'

/**
 * Check whether a temporal time instance equals to another temporal time instance.
 */
export default class TemporalTimeEquals extends APIFunction {
    name = '$temporalTimeEquals'
    description = 'Check whether a temporal time instance equals to another temporal time instance.'
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
            name: 'Name or Time',
            description: 'The name of the temporal time or numeric value.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = makeUsage(this.name, this.parameters)
    returns = ParamType.Boolean
    compile = true
    async run(d: Data, [name, check]: string[]) {
        const time = d.getInternalVar<Temporal.Instant>(`temporal:${name}`)
        
        if (d.internalVarExists(`temporal:${check}`)) {
            const other = d.getInternalVar<Temporal.Instant>(`temporal:${check}`)
            return String(time.equals(other))
        } else {
            return String(time.equals(check))
        }
    }
}
