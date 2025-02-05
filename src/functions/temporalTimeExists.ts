import { APIFunction, type Data, ParamType } from 'easy-api.ts'
import { makeUsage } from '..'

/**
 * Check whether a temporal time instance exists.
 */
export default class TemporalTimeExists extends APIFunction {
    name = '$temporalTimeExists'
    description = 'Check whether a temporal time instance exists.'
    parameters = [
        {
            name: 'Name',
            description: 'The name of the temporal time.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    usage = makeUsage(this.name, this.parameters)
    returns = ParamType.Boolean
    compile = true
    async run(d: Data, [name]: string[]) {
        return String(d.internalVarExists(`temporal:${name}`))
    }
}
