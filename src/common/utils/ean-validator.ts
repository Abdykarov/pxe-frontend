// https://github.com/dominiklessel/node-barcoder

export class EanValidator {
    static validate(barcode: string): boolean {

        const format =  {
            validChars : /^\d+$/,
            validLength : 18,
        };

        const validChars = format.validChars;
        const validLength = format.validLength;

        if ( validChars.exec( barcode ) === null ) {
            return false;
        }

        if (barcode.length !== validLength ) {
            return false;
        } else if ( barcode.length > validLength ) {
            return false;
        }

        return EanValidator.validateGtin( barcode );
    }

    static validateGtin( value ): boolean {

        const barcode = value.substring( 0, value.length - 1 );
        const checksum = parseInt( value.substring( value.length - 1 ), 10 );
        let calcSum = 0;
        let calcChecksum = 0;

        barcode.split('').map(function( number, index ) {
            number = parseInt( number, 10 );
            if ( value.length % 2 === 0 ) {
                index += 1;
            }
            if ( index % 2 === 0 ) {
                calcSum += number;
            } else {
                calcSum += number * 3;
            }
        });

        calcSum %= 10;
        calcChecksum = (calcSum === 0) ? 0 : (10 - calcSum);

        return calcChecksum === checksum;
    }
}
