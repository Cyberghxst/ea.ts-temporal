import { APIFunction, type Data, ParamType } from 'easy-api.ts'
import { Temporal } from 'temporal-polyfill'
import { makeUsage } from '..'

/**
 * Creates a new temporal time instance.
 */
export default class CreateTemporalTime extends APIFunction {
    name = '$createTemporalTime'
    description = 'Creates a new temporal time instance.'
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
    returns = ParamType.Unknown
    compile = true
    async run(d: Data, [name]: string[]) {
        d.setInternalVar(
            `temporal:${name}`,
            new Temporal.Instant(
                Temporal.Now.instant().epochNanoseconds
            )
        )
    }
}
