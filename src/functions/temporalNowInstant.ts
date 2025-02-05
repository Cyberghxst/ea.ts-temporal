import { APIFunction, ParamType } from 'easy-api.ts'
import { Temporal } from 'temporal-polyfill'

/**
 * Get the exact system date and time as a `$temporalInstant[]`.
 *
 * This method gets the current exact system time, without regard to
 * calendar or time zone. This is a good way to get a timestamp for an
 * event, for example. It works like the old-style `$dateNow[]`,
 * but with nanosecond precision instead of milliseconds.
 *
 * Note that a `$temporalInstant[]` doesn't know about time zones. For the
 * exact time in a specific time zone, use `$temporalNowZonedDateTimeISO[]`
 * or `$temporalNowZonedDateTime[]`.
 */
export default class TemporalNowInstant extends APIFunction {
    name = '$temporalNowInstant'
    description = 'Get the exact system date and time.'
    usage = this.name
    returns = ParamType.Number
    compile = false
    run = async function() {
        return Temporal.Now.instant().epochNanoseconds.toString()
    }
}
