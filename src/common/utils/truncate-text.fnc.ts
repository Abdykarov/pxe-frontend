import * as R from 'ramda';

export const truncateText = (
    from: number,
    appendAfterMaxLength: string,
    text: string
): string =>
    R.when(
        R.propSatisfies(R.gt(R.__, from), 'length'),
        R.pipe(R.take(from), R.append(appendAfterMaxLength), R.join(''))
    )(text);
